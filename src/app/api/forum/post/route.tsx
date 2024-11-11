import { createPost, createTopic, updatePost } from '@/services/threadService';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const { threadId, userId, content, citedPosts } = await request.json();
        
        if (!threadId || !content || !userId) {
            return NextResponse.json({ error: 'Campos obrigatórios faltando!' }, { status: 400 });
        }

        console.log(citedPosts)

        const post = await createPost(threadId, userId, content, citedPosts || []);
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