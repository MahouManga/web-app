import prisma from '@/lib/db';

import { Chapter } from '@prisma/client';

export function getChapters(id: number): Promise<Chapter[]> {
    return prisma.chapter.findMany({
        where: { serieID: id }
    });
}

export function getChapterID(id: string): Promise<Chapter | null> {
    return prisma.chapter.findUnique({
        where: { id }
    });
}