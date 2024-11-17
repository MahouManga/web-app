import prisma from '@/lib/db';

import { Chapter } from '@prisma/client';

export async function getChapters(id: number): Promise<Chapter[]> {
    return await prisma.chapter.findMany({
        where: { serieID: id }
    });
}

export async function getChaptersByUserID(id: string, serieID: number): Promise<Chapter[]> {
    return await prisma.chapter.findMany({
        where: { serieID: serieID, userId: id }
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
    const { title, index, volume, type, serieID, contentText, userId } = chapterData
    console.log(type)

    const newchapter = await prisma.chapter.create({
        data: {
            title,
            index: Number(index),
            volume: Number(volume),
            type,
            serieID,
            userId,
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

export async function createMangaChapter(chapterData: any) {
    const { title, index, volume, type, serieID, userId } = chapterData
    console.log(type)

    const newchapter = await prisma.chapter.create({
        data: {
            title,
            index: Number(index),
            volume: Number(volume),
            type,
            serieID,
            userId
        }
    });

    return newchapter;
}

export async function updateMangaChapter(chapterData: any) {
    const { title, index, volume, type, chapterID, imagens } = chapterData;
    console.log(imagens)

    // Busca o capítulo e seu conteúdo para verificar os dados atuais
    const existingChapter = await prisma.chapter.findUnique({
        where: { id: chapterID },
        include: { content: { include: { pages: true } } },
    });

    if (!existingChapter) {
        throw new Error("Chapter not found.");
    }

    let contentId: string;

    // Se o conteúdo não existir, crie um novo conteúdo para o capítulo
    if (!existingChapter.content) {
        const newContent = await prisma.chapterContent.create({
            data: {
                type: type,
                chapterID: chapterID,
                pages: {
                    create: imagens.map((img: any, idx: number) => ({
                        imageURL: img.imageURL,
                        order: idx,
                        width: img.width,
                        height: img.height,
                        fileSize: img.fileSize,
                    })),
                },
            },
        });
        contentId = newContent.id;
    } else {
        // Se o conteúdo já existir, armazene o ID para futuras operações
        contentId = existingChapter.content.id;

        // Mapeia páginas existentes para facilitar comparações
        const existingPages = existingChapter.content.pages;
        const existingPagesMap = new Map(existingPages.map((page) => [page.imageURL, page]));

        // Criação ou atualização de páginas com base nos dados recebidos
        const updateOrCreateOperations = imagens.map((img: any) => {
            const existingPage = existingPagesMap.get(img.imageURL);

            if (existingPage) {
                // Atualiza a página existente se necessário
                return prisma.page.update({
                    where: { id: existingPage.id },
                    data: {
                        order: img.order,
                        width: img.width,
                        height: img.height,
                        fileSize: img.fileSize,
                    },
                });
            } else {
                // Cria uma nova página se não encontrar correspondência
                return prisma.page.create({
                    data: {
                        imageURL: img.imageURL,
                        order: img.order,
                        width: img.width,
                        height: img.height,
                        fileSize: img.fileSize,
                        chapterContentId: contentId,
                    },
                });
            }
        });

        // Exclusão de páginas que não estão na nova lista de imagens
        const imagesURLs = imagens.map((img: any) => img.imageURL);
        const deleteOperations = existingPages
            .filter((page) => !imagesURLs.includes(page.imageURL))
            .map((page) => prisma.page.delete({ where: { id: page.id } }));

        // Executa operações de criação, atualização e exclusão em uma transação
        await prisma.$transaction([...updateOrCreateOperations, ...deleteOperations]);
    }

    // Atualiza título, índice e volume somente se houver mudanças
    const chapterUpdates: any = {};
    if (title !== existingChapter.title) chapterUpdates.title = title;
    if (index !== existingChapter.index) chapterUpdates.index = Number(index);
    if (volume !== existingChapter.volume) chapterUpdates.volume = Number(volume);

    if (Object.keys(chapterUpdates).length > 0) {
        await prisma.chapter.update({
            where: { id: chapterID },
            data: chapterUpdates,
        });
    }

    // Retorna o capítulo atualizado
    return await prisma.chapter.findUnique({ where: { id: chapterID } });
}

export async function updateNovelChapter(chapterData: any) {
    const { title, index, volume, type, id, contentText } = chapterData;
    console.log(type)

    const newchapter = await prisma.chapter.update({
        where: { id: id },
        data: {
            title,
            index: Number(index),
            volume: Number(volume),
            type,
            content: {
                update: {
                    type: type,
                    text: contentText
                }
            }
        }
    });
    return newchapter
}

export async function deleteChapter(body:any) {
    const { id, userId } = body;
    try {

        const chapter = await prisma.chapter.findFirst({
            where: { id: id },
            include: {
                content: {
                    include: {
                        pages: true,
                    },
                },
            },
        });

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!chapter) {
            throw new Error("Chapter not found.");
        }

        if (chapter.userId !== userId && user?.role !== "ADMIN") {
            throw new Error("You don't have permission to delete this chapter.");
        }

        const chapterContent = await prisma.chapterContent.findFirst({ where: { chapterID: chapter.id } });

        if (chapterContent) {
            await prisma.page.deleteMany({ where: { chapterContentId: chapterContent.id } });
            await prisma.chapterContent.delete({ where: { id: chapterContent.id } });
        }

        await prisma.chapter.delete({ where: { id: chapter.id } });

        return { success: true, message: "Chapter deleted successfully." };
    } catch (error: any) {
        console.error("Error deleting chapter:", error);
        return { success: false, message: "Error deleting chapter.", error: error.message };
    }
}