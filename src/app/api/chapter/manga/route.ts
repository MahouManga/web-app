import { NextResponse } from 'next/server';
import { createMangaChapter, createNovelChapter, updateMangaChapter } from '@/services/chapterService';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body) {
            return NextResponse.json({ error: 'Body inválido.' }, { status: 400 });
        }

        const chapter = await createMangaChapter(body);

        return NextResponse.json({ message: 'Capítulo criado com sucesso.', data: chapter }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao criar capítulo.', error: error }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        if (!body) {
            return NextResponse.json({ error: 'Body inválido.' }, { status: 400 });
        }

        const chapter = await updateMangaChapter(body);

        return NextResponse.json({ message: 'Paginas atualizadas com sucesso.', data: chapter }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao atualizar capítulo.', error: error }, { status: 500 });
    }
}