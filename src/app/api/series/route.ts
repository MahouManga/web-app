import { NextRequest, NextResponse } from 'next/server';
import { createSerie, getSerieByTitle, getSeries, updateSerie } from '@/services/serieService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');

    if (title !== null) {
      const series = await getSerieByTitle(title);
      return NextResponse.json(series.data, { status: 200 });
    }

    const q = searchParams.get('q');
    const orderBy = searchParams.get('orderBy');
    const sort = searchParams.get('sort');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');
    const genre = searchParams.get('genre');
    const type = searchParams.get('type');

    const series = await getSeries(
      q as string,
      orderBy as string,
      sort as string,
      status as string,
      genre as string,
      limit as string,
      type as string
    );

    return NextResponse.json(series, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter séries.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const serieData = await request.json();
    const serie = await createSerie(serieData);

    return NextResponse.json(serie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar série.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const serieData = await request.json();
    const { id, ...restoSerie } = serieData;
    const serie = await updateSerie(id, restoSerie);

    return NextResponse.json(serie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar a série.' }, { status: 500 });
  }
}