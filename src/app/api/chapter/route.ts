import { deleteChapter, getChapters } from "@/services/chapterService";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const body = await request.json();

        if (!body) {
            return NextResponse.json({ error: 'Body inválido.' }, { status: 400 });
        }

        const chapter = deleteChapter(body);

        return NextResponse.json({ message: 'Capítulo criado com sucesso.', chapter }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao criar capítulo.', error: error }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const serieID = searchParams.get('serieID');

        if (!serieID) {
            return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 });
        }

        const chapters = await getChapters(Number(serieID));
        console.log(chapters)

        return NextResponse.json({ data: chapters }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao buscar capítulos.', error: error }, { status: 500 });
    }
}