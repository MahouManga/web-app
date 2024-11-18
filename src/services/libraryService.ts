import prisma from '@/lib/db';

export interface LibraryRatingsData {
    bookmarks: number;
    averageRating: string;
    monthlyViews: number;
    ratingsCount: number;
}

export const getLibraryRatings = async (serieID: number) => {
    const statistics = await prisma.userLibrary.aggregate({
        _avg: {
            rating: true,
        },
        _count: {
            bookmark: true,
            rating: true,
        },
        where: {
            serieID,
            rating: {
                gte: 0,
            }
        },
    });

    // Pega os dados de views e ratings da novel
    const monthlyViews = await prisma.viewLog.aggregate({
        _sum: {
            views: true,
        },
        where: {
            serieID,
            type: 'monthly',
        },
    });

    // Se monthlyViews._sum.views for null, substitua por 0
    const monthlyViewsSum = monthlyViews._sum.views ?? 0;

    const averageRating = statistics._avg.rating ? statistics._avg.rating.toFixed(1) : '0.0';

    return {
        bookmarks: statistics._count.bookmark,
        averageRating,
        monthlyViews: monthlyViewsSum,
        ratingsCount: statistics._count.rating,
    };
}

export const getUserLibraryOnSerie = async (userId: string | null, serieID: number) => {
    if (!userId) {
        return {}
    }
    return await prisma.userLibrary.upsert({
        where: {
            userId_serieID: { // certifique-se de ter um índice único em `userId` e `serieID`
                userId,
                serieID
            }
        },
        update: {},
        create: {
            userId,
            serieID
        }
    });
}

export const updateLibraryUserOnSerie = async (userId: string, serieID: number, option: string, args: any) => {
    try {
        if (!['bookmark', 'notification', 'status', 'read', 'notread', 'rating'].includes(option)) {
            return {
                error: {
                    message: "Invalid option",
                    status: 400
                }
            };
        }

        const user = await prisma.user.findFirst({
            where: { id: userId }
        });

        if (!user) {
            return {
                error: {
                    message: "User not found",
                    status: 404
                }
            };
        }

        // Atualização da biblioteca
        const updateData: any = {};

        if (option === 'status') {
            updateData.status = Number(args);
        } else if (option === 'bookmark') {
            updateData.bookmark = args;
        } else if (option === 'notification') {
            updateData.notification = args;
        } else if (option === 'rating') {
            updateData.rating = Number(args);
        } else if (option === 'read' || option === 'reading') {
            const chapterId = Number(args);
        }

        const updatedLibrary = await prisma.userLibrary.update({
            where: {
                userId_serieID: {
                    userId: user.id,
                    serieID
                }
            },
            data: updateData,
        });

        return updatedLibrary;

    } catch (error) {
        console.error(error);
    }
}

export async function libraryChaptersReaded(userId: string) {
    try {
        const chaptersReaded = await prisma.userReadHistory.findMany({
            where: {
                userId
            },
            include: {
                serie: true,
                chapter: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        if (!chaptersReaded) {
            return []
        }
        return chaptersReaded
    } catch (error) {
        console.error(error)
    }
}

export async function chaptersReaded(userId: string, serieID: number) {
    try {
        const chaptersReaded = await prisma.userReadHistory.findMany({
            where: {
                userId,
                serieID,
            }
        })
        if (!chaptersReaded) {
            return {}
        }
        return chaptersReaded
    } catch (error) {
        console.error(error)
    }
}

// Função para alternar o status de leitura de um capítulo (lido ou atualizado)
export async function toggleChapterReadStatus(userId: string, serieID: number, chapterID: string) {
    try {
        const readHistory = await prisma.userReadHistory.upsert({
            where: {
                userId_chapterID: {
                    userId,
                    chapterID,
                },
            },
            update: {
                createdAt: new Date(), // Atualiza o timestamp para a data atual
            },
            create: {
                userId,
                serieID,
                chapterID,
            },
        });

        return readHistory;
    } catch (error) {
        console.error('Error toggling chapter read status:', error);
        throw error;
    }
}

export async function unmarkChapterAsRead(userId: string, chapterID: string) {
    try {
        const deleteResult = await prisma.userReadHistory.deleteMany({
            where: {
                userId,
                chapterID,
            },
        });

        return deleteResult;
    } catch (error) {
        console.error('Error unmarking chapter as read:', error);
        throw error;
    }
}


export async function getUserSeriesAndChapterStats(userId: string) {
    try {
        // Busca todas as séries associadas ao usuário, incluindo o tipo de série
        const userSeries = await prisma.userLibrary.findMany({
            where: {
                userId,
                OR: [
                    { bookmark: true },
                    { notification: true },
                    { status: { gte: 0 } },
                    { rating: { not: null } }, // Verif'        ica se rating não é null
                ],
            },
            include: {
                serie: {
                    select: {
                        type: true,
                    },
                },
            },
        });

        // Conta séries por tipo
        const seriesCountByType = userSeries.reduce(
            (counts, entry) => {
                if (entry.serie.type === 'NOVEL') counts.NOVEL++;
                if (entry.serie.type === 'MANGA') counts.MANGA++;
                return counts;
            },
            { NOVEL: 0, MANGA: 0 }
        );

        // Busca todos os registros de capítulos lidos para o usuário, junto com o tipo de série
        const userChaptersRead = await prisma.userReadHistory.findMany({
            where: { userId },
            include: {
                serie: {
                    select: {
                        type: true,
                    },
                },
            },
        });

        // Filtra e conta capítulos lidos por tipo de série
        const chaptersReadCount = {
            NOVEL: userChaptersRead.filter((record) => record.serie?.type === 'NOVEL').length,
            MANGA: userChaptersRead.filter((record) => record.serie?.type === 'MANGA').length,
        };

        // Processa os dados para retornar em um formato mais simples
        const result = {
            totalSeries: seriesCountByType,
            totalChaptersRead: chaptersReadCount,
        };

        return result;
    } catch (error) {
        console.error('Error fetching series and chapter stats for user:', error);
        throw error;
    }
}


export async function getUserSeriesByType(userId: string, type: 'NOVEL' | 'MANGA') {
    try {
        // Consulta todas as séries do tipo especificado no UserLibrary do usuário
        const userSeries = await prisma.userLibrary.findMany({
            where: {
                userId,
                OR: [
                    { bookmark: true },
                    { notification: true },
                    { status: { gte: 0 } },
                    { rating: { not: null } }, // Verifica se rating não é null
                ],
                serie: {
                    type,
                },
            },
            include: {
                serie: {
                    include: {
                        chapters: {
                            orderBy: { index: 'desc' },
                            take: 1, // Último capítulo disponível
                        },
                    },
                },
            },
        });

        // Consulta separada para obter o último capítulo lido por série para o usuário
        const userReadHistory = await prisma.userReadHistory.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                chapter: true, // Inclui todos os dados do capítulo lido
            },
        });

        // Mapeia os dados e inclui o último capítulo lido como objeto completo
        const seriesWithChapters = userSeries.map((entry) => {
            // Obtém o objeto completo do último capítulo lido da série específica
            const lastReadChapter = userReadHistory.find((record) => record.serieID === entry.serieID)?.chapter || null;
            const lastAvailableChapter = entry.serie.chapters[0] || null; // Objeto completo do último capítulo disponível

            return {
                ...entry,
                lastChapterRead: lastReadChapter,
                lastAvailableChapter,
            };
        });

        return seriesWithChapters;
    } catch (error) {
        console.error('Error fetching user series by type:', error);
        throw error;
    }
}

export async function getUserComments(userId: string, page: number, pageSize: number = 2) {
    try {
        const skip = (page - 1) * pageSize;

        const [comments, totalComments] = await Promise.all([
            prisma.comments.findMany({
                where: { userId },
                include: {
                    serie: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                    chapter: {
                        select: {
                            id: true,
                            title: true,
                            index: true,
                            volume: true,
                        },
                    },
                    parent: {
                        select: {
                            user: true,
                            content: true,
                        },
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: pageSize,
            }),
            prisma.comments.count({
                where: { userId },
            }),
        ]);

        const totalPages = Math.ceil(totalComments / pageSize);

        return {
            comments,
            totalComments,
            totalPages,
        };
    } catch (error) {
        console.error('Error fetching user comments:', error);
        throw error;
    }
}