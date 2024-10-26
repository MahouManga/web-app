import { createCategory, getCategorys, updateCategory } from '@/services/forumService';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const categories = await getCategorys();
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao obter categorias.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        if (!name) {
            return NextResponse.json({ error: 'Nome da categoria obrigatorio.' }, { status: 400 });
        }

        const newCategory = await createCategory(name);
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar categoria.' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, name } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'ID da categoria obrigatorio.' }, { status: 400 });
        }

        if (!name) {
            return NextResponse.json({ error: 'Nome da categoria obrigatorio.' }, { status: 400 });
        }
        const newCategory = await updateCategory(id, name);
        console.log(newCategory)
        return NextResponse.json(newCategory, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar categoria.' }, { status: 500 });
    }
}