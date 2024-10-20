import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }

  const { title, content } = req.body;

  // Valida se o título e conteúdo foram enviados
  if (!title || !content) {
    return res.status(400).json({ message: 'Título e conteúdo são obrigatórios' });
  }

  try {
    // Cria o post no banco de dados
    const post = await prisma.post.create({
      data: { title, content },
    });

    return res.status(201).json(post); // Retorna o post criado
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar o post', error });
  }
}
