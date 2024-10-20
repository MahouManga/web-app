import { NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Certifique-se de usar o caminho correto para o Prisma Client

// Lida com GET para buscar os posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc', // Ordena por data de criação, do mais recente para o mais antigo
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return NextResponse.json({ error: 'Erro ao buscar posts.' }, { status: 500 });
  }
}

// Lida com POST para criar um novo post
export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    // Validação simples de campos
    if (!title || !content) {
      return NextResponse.json({ error: 'Título e conteúdo são obrigatórios.' }, { status: 400 });
    }

    // Criação do post no banco de dados usando Prisma
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return NextResponse.json({ error: 'Erro ao criar post.' }, { status: 500 });
  }
}
