import prisma from '@/lib/db';

import { Chapter } from '@prisma/client';

export async function getChapters(id: number): Promise<Chapter[]> {
    return await prisma.chapter.findMany({
        where: { serieID: id }
    });
}

export async function getChapterID(id: string): Promise<Chapter | null> {
    return await prisma.chapter.findUnique({
        where: { id },
        include: {
            content: {
                include: {
                    pages: true
                }
            }
        }
    });
}

export async function createNovelChapter(chapterData: any) {
    const { title, index, volume, type, serieID, contentText } = chapterData
    console.log(type)
    
    const newchapter = await prisma.chapter.create({
        data: {
            title,
            index: Number(index),
            volume: Number(volume),
            type,
            serieID,
            content: {
                create: {
                    type: type,
                    text: contentText
                }
            }
        }
    });

    return newchapter;
}