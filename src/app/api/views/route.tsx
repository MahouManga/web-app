import { NextResponse } from 'next/server';
import { registerView } from '@/services/viewService';
import { getSerie } from '@/services/serieService';

export async function POST(request: Request) {
    try {
        const { serieID } = await request.json();
        const serie = await getSerie(Number(serieID));

        if (!serie) {
            return NextResponse.json({ error: 'Série não encontrada.' }, { status: 200 });
        }

        const views = await registerView(Number(serieID));

        return NextResponse.json({ message: 'Visualização registrada com sucesso.' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar série.' }, { status: 500 });
    }
}
