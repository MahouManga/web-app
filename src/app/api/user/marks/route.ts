import { updateLibraryUserOnSerie } from '@/services/libraryService';
import { getSerie } from '@/services/serieService';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    try {
        const { serieID, userId, option, args } = await request.json();
        const serie = await getSerie(Number(serieID));


        if (!serie) {
            return NextResponse.json({ error: 'Série não encontrada.' }, { status: 200 });
        }

        const library = await updateLibraryUserOnSerie(userId, Number(serieID), option, args);

        console.log(library)

        return NextResponse.json(library, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao atualizar os dados!' }, { status: 500 });
    }
}