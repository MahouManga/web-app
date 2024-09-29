import { NextResponse } from 'next/server';
import { deleteTag, getTag, updateTag } from '@/services/tagService';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const genre = await getTag(id);

    if (genre) {
      return NextResponse.json(genre, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Tag não encontrado.' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter gênero.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const genreData = await request.json();
    const genre = await updateTag(id, genreData);
    return NextResponse.json(genre, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar Tag.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const genre = await deleteTag(id);
    return NextResponse.json(genre, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar Tag.' }, { status: 500 });
  }
}
