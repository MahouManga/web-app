import { createComment, getCommentsWithReplies } from '@/services/commentService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { itemId, userId, type, parentId, content } = await request.json();

        console.log(itemId, userId, type, parentId, content)

        if (!itemId || !userId || !type || !content) {
            return NextResponse.json({ error: 'Campos obrigatórios faltando!' }, { status: 400 });
        }

        const comment = await createComment(itemId, userId, type, parentId, content);
        return NextResponse.json(comment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao criar comentaário.', error: error }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try{
        const { searchParams } = new URL(request.url);
        const itemId = searchParams.get("itemId");
        const type = searchParams.get("type");
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 20;

        if (!itemId || typeof itemId !== 'string' || !type || typeof type !== 'string') {
            return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 });
        }

        const comments = await getCommentsWithReplies(itemId, type as 'serie' | 'chapter' | 'profile', limit, page);
        return NextResponse.json({ comments:comments }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao buscar comentaários.', error: error }, { status: 500 });
    }
}