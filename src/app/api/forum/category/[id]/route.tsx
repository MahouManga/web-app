// /app/api/forum/category/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Check if the category exists
    const category = await prisma.forumCategory.findUnique({
      where: { id },
    });

    if (!category) {
      return new NextResponse('Category not found', { status: 404 });
    }
    console.log('deleting?')

    // Delete the category
    await prisma.forumCategory.delete({
      where: { id },
    });

    // Reorder the remaining categories by position
    const remainingCategories = await prisma.forumCategory.findMany({
      orderBy: { position: 'asc' },
    });

    // Update positions in ascending order
    const updatePromises = remainingCategories.map((category, index) => {
      return prisma.forumCategory.update({
        where: { id: category.id },
        data: { position: index + 1 },
      });
    });

    await Promise.all(updatePromises);

    return new NextResponse('Category deleted and reordered successfully', { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
