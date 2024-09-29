import { NextResponse } from 'next/server';
import { getGenres, createGenre, deleteGenre, updateGenre } from '@/services/genreService';

export async function GET(request: Request) {
  try {
    const genres = await getGenres();
    return NextResponse.json(genres, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter gêneros.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const genreData = await request.json();
    const genre = await createGenre(genreData);
    console.log(genre);
    return NextResponse.json(genre, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar gênero.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
    try {
      const genreData = await request.json();
      const id = genreData.id
  
      if (!id) {
        return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
      }
  
      const updatedGenre = await updateGenre(id, genreData);
      return NextResponse.json(updatedGenre, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Erro ao atualizar gênero.' }, { status: 500 });
    }
  }

export async function DELETE(request: Request) {
  try {
    const genreData = await request.json();
    const id = genreData.id;

    if (!id) {
      return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
    }

    const genre = await deleteGenre(id);
    return NextResponse.json(genre, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar gênero.' }, { status: 500 });
  }
}

// Se um método HTTP não for suportado, o Next.js retornará um erro 405 automaticamente.
