import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    try {
        const categories = await request.json();

        if (!Array.isArray(categories)) {
            return new NextResponse('Invalid data format', { status: 400 });
        }

        const updatePromises = categories.map((category: { id: string; position: number }) => {
            return prisma.forumCategory.update({
                where: { id: category.id },
                data: { position: category.position },
            });
        });

        await Promise.all(updatePromises);

        return new NextResponse('Categories reordered successfully', { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao reordenar categorias.' }, { status: 500 });
    }
}