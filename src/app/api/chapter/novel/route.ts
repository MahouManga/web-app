import { NextResponse } from 'next/server';
import { createNovelChapter, updateNovelChapter } from '@/services/chapterService';

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb', // Aumente conforme necessário
      },
    },
};

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body) {
            return NextResponse.json({ error: 'Body inválido.' }, { status: 400 });
        }

        const chapter = await createNovelChapter(body);

        return NextResponse.json({ message: 'Capítulo criado com sucesso.', chapter }, { status: 201 });
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

        const chapter = updateNovelChapter(body);

        return NextResponse.json({ message: 'Capítulo criado com sucesso.', chapter }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao criar capítulo.', error: error }, { status: 500 });
    }
}