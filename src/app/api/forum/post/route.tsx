import { createPost, updatePost } from '@/services/threadService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { threadId, userId, content } = await request.json();

        console.log(threadId, userId, content)

        if (!threadId || !content || !userId) {
            return NextResponse.json({ error: 'Campos obrigatórios faltando!' }, { status: 400 });
        }

        const post = await createPost(threadId, userId, content);
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao criar post.', error: error }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { userId, postId, content } = await request.json();

        const post = await updatePost(userId, postId, content);
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao atualizar post.', error: error }, { status: 500 });
    }
}