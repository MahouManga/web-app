import { NextResponse } from 'next/server';
import { getGenre, updateGenre, deleteGenre } from '@/services/genreService';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const genre = await getGenre(Number(id));

    if (genre) {
      return NextResponse.json(genre, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Gênero não encontrado.' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter gênero.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const genreData = await request.json();
    const genre = await updateGenre(Number(id), genreData);
    return NextResponse.json(genre, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar gênero.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const genre = await deleteGenre(Number(id));
    return NextResponse.json(genre, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar gênero.' }, { status: 500 });
  }
}
