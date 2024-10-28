import { createTopic } from '@/services/threadService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

    try {
        const { title, content, forumId, userId } = await request.json();

        if (!title || !content || !forumId || !userId) {
            return NextResponse.json({ error: 'Campos obrigatórios faltando!' }, { status: 400 });
        }

        const topic = await createTopic(title, content, forumId, userId);
        return NextResponse.json(topic, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao criar topico.', error: error }, { status: 500 });
    }
}