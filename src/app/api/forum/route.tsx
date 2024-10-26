import { createForum, updateForum } from '@/services/forumService';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

}

export async function POST(request: Request) {
    try {
        const {
            title,
            description,
            allowTopics,
            isPublic,
            categoryId,
            parentForumId,
        } = await request.json();

        if (!title) {
            return new NextResponse('Title is required', { status: 400 });
        }

        const newForum = await createForum(title, description, allowTopics, isPublic, categoryId, parentForumId);

        return NextResponse.json(newForum, { status: 201 });

    } catch (error) {
        return NextResponse.json({ mensagem: 'Erro ao criar forum.', error: error }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, name } = await request.json();
        if (!id) {
            return NextResponse.json({ error: 'ID da categoria obrigatorio.' }, { status: 400 });
        }

        if (!name) {
            return NextResponse.json({ error: 'Nome da categoria obrigatorio.' }, { status: 400 });
        }
        const editForum = await updateForum(id, name);
        console.log(editForum)
        return NextResponse.json(editForum, { status: 200 });

    } catch (error) {
        return NextResponse.json({ mensagem: 'Erro ao criar forum.', error: error }, { status: 500 });
    }
}