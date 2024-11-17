import { deleteChapter } from "@/services/chapterService";
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