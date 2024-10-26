import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  try {
    const posts = await prisma.post.findMany({
      where: {
        category: category || undefined, // Filtra pela categoria, se fornecida
      },
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

export async function POST(request: Request) {
  try {
    const { title, content, category } = await request.json();

    if (!title || !content || !category) {
      return NextResponse.json({ error: 'Título, conteúdo e categoria são obrigatórios.' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return NextResponse.json({ error: 'Erro ao criar post.' }, { status: 500 });
  }
}
