import prisma from "@/lib/db";
import { Chapter, Genre, Serie, SerieSubtype, SerieType } from "@prisma/client";
import genSlug from "@/utils/slugify";

export interface SerieDataList {
    data?: SeriePlus[];
    error?: ErrorData;
}

export interface SeriePlus extends Serie {
    genres?: Genre[];
    authors?: { name: string }[];
    titles?: { title: string; type: string }[];
    chapters?: Chapter[];
    _count?: {
        chapters: number;
    }
}

export interface ErrorData {
    message: string;
    status: number;
    error?: any;
}

export interface SerieData {
    data?: SeriePlus;
    error?: ErrorData;
}

export interface SerieCreateInput {
    slug: string;
    title: string;
    synopsis: string;
    description: string;
    readingTips?: string;
    status: number;
    adult?: boolean;
    posterImage: string;
    coverImage: string;
    type: string;
    subtype: string;
    releasedAt: string;
    authors?: { name: string }[]; // Nomes dos autores
    genres?: number[]; // Assuming these are genre IDs
    titles: { title: string; type: string }[]; // Títulos da Serie
}

export const convertDatesToStrings = (novel: SeriePlus): any => {
    return {
        ...novel,
        createdAt: novel.createdAt.toISOString(),
        updatedAt: novel.updatedAt.toISOString(),
        chapters: novel.chapters?.map(chapter => ({
            ...chapter,
            createdAt: chapter.createdAt.toISOString(),
            updatedAt: chapter.updatedAt.toISOString(),
        })) || [],
    };
};

export const getSerieByTitle = async (title: string): Promise<SerieData> => {
    try {
        const serie = await prisma.serie.findFirst({
            where: {
                OR: [
                    {
                        title: {
                            contains: title,
                            mode: 'insensitive', // case-insensitive search
                        },
                    },
                    {
                        titles: {
                            some: {
                                title: {
                                    contains: title,
                                    mode: 'insensitive', // case-insensitive search
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                titles: true,
                authors: true,
                genres: true,
                chapters: true
            },
        });
        if (!serie) {
            return {
                error: {
                    message: 'Serie not found',
                    status: 404,
                }
            };
        }

        const serializedSeries = convertDatesToStrings(serie);

        return { data: serializedSeries };

    } catch (error) {
        return {
            error: {
                message: 'Error fetching novel',
                status: 500,
                error: error,
            }
        };
    }
}

export const getSerie = async (id: number): Promise<SerieData> => {
    try {
        const serie = await prisma.serie.findUnique({
            where: {
                id
            },
            include: {
                genres: true,
                authors: true,
                titles: true,
            }
        });

        if (!serie) {
            return {
                error: {
                    message: "Serie not found",
                    status: 404,
                },
            };
        }
        return { data: serie };
    } catch (error) {
        return {
            error: {
                message: "Error fetching serie",
                error: error,
                status: 500,
            },
        };
    }
}

export const getSeries = async (
    search: string,
    orderBy: string,
    sort: string,
    status: string,
    genre: string,
    limit: string,
    type: string
): Promise<SerieDataList> => {
    //console.log('Search', search, orderBy, sort, limit, status, genre);
    const orderField = orderBy || 'title';

    try {
        let order = {};

        if (orderBy === 'chapterCount') {
            order = {
                chapters: {
                    _count: sort || 'asc',
                },
            };
        } else {
            order = {
                [orderField]: sort || 'asc',
            };
        }

        const series = await prisma.serie.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search || '',
                            mode: 'insensitive', // case-insensitive search
                        },
                    },
                    {
                        titles: {
                            some: {
                                title: {
                                    contains: search || '',
                                    mode: 'insensitive', // case-insensitive search
                                },
                            },
                        },
                    },
                ],
                status: Number(status) >= 1 ? Number(status) : undefined,
                genres: genre ? { some: { id: Number(genre) } } : undefined,
                type: type ? type as SerieType : undefined, // Converta a string para o tipo enum esperado
            },
            take: limit ? Number(limit) : 100,
            orderBy: order,
            include: {
                titles: true,
                _count: {
                    select: {
                        chapters: true,
                    },
                }
            },
        });

        const serializedSeries = series.map(convertDatesToStrings);

        return { data: serializedSeries };
    } catch (error) {
        console.log(error)
        throw new Error('Failed to retrieve novels.' + error);
    }
};

export const createSerie = async (data: SerieCreateInput): Promise<SerieData> => {
    try {
        const authorsData = data.authors?.map((author: { name: string }) => ({
            where: { name: author.name },
            create: { name: author.name },
        })) || [];
        const titlesData = data.titles?.map((title: { title: string; type: string }) => ({ title: title.title, type: title.type })) || [];
        const genresData = data.genres?.map((genreId: number) => ({ id: genreId })) || [];

        const novel = await prisma.serie.create({
            data: {
                title: data.title,
                slug: genSlug(data.title),
                synopsis: data.synopsis,
                description: data.description,
                adult: data.adult ?? false,
                status: Number(data.status),
                type: data.type.toUpperCase() as SerieType,
                subtype: data.subtype.toUpperCase() as SerieSubtype,
                posterImage: data.posterImage ?? '',
                coverImage: data.coverImage ?? '',
                releasedAt: Number(data.releasedAt),
                authors: {
                    connectOrCreate: authorsData,
                },
                genres: {
                    connect: genresData,
                },
                titles: {
                    create: titlesData,
                },
            },
        });
        return { data: novel };
    } catch (error) {
        return {
            error: {
                message: "Error creating novel",
                status: 500,
                error: error,
            }
        };
    }
}

export const updateSerie = async (id: number, data: SerieCreateInput): Promise<SerieData> => {
    try {
        // Buscar os IDs dos gêneros atuais diretamente do Prisma
        const existingSerie = await prisma.serie.findUnique({
            where: { id },
            select: {
                genres: {
                    select: { id: true },
                },
            },
        });

        // Verificar se a série existe
        if (!existingSerie) {
            throw new Error('Série não encontrada.');
        }
        // Obter os IDs dos gêneros atualmente associados
        const existingGenreIds = existingSerie.genres.map((genre) => genre.id);
        
        const authorsData = data.authors?.map((author: { name: string }) => ({
            where: { name: author.name },
            create: { name: author.name },
        })) || [];
        const titlesData = data.titles?.map((title: { title: string; type: string }) => ({ title: title.title, type: title.type })) || [];
        const genresData = data.genres?.map((genreId: number) => ({ id: genreId })) || [];

        // Determina quais gêneros devem ser desconectados
        const genresToDisconnect = existingGenreIds
            .filter((id) => !(data.genres ?? []).includes(id))
            .map((id) => ({ id }));

        const serie = await prisma.serie.update({
            where: { id },
            data: {
                title: data.title,
                slug: genSlug(data.title),
                synopsis: data.synopsis,
                description: data.description,
                adult: data.adult ?? false,
                status: Number(data.status),
                type: data.type.toUpperCase() as SerieType,
                subtype: data.subtype.toUpperCase() as SerieSubtype,
                posterImage: data.posterImage ?? '',
                coverImage: data.coverImage ?? '',
                releasedAt: Number(data.releasedAt),
                authors: {
                    connectOrCreate: authorsData,
                },
                genres: {
                    disconnect: genresToDisconnect, // Desconectar gêneros que não estão mais associados
                    connect: genresData, // Conectar novos gêneros
                },
                titles: {
                    deleteMany: {}, // Remove todos os títulos associados a esta série
                    create: titlesData, // Adiciona os novos títulos
                },
            },
        });
        return { data: serie };
    } catch (error) {
        return {
            error: {
                message: "Error updating novel",
                status: 500,
                error: error,
            }
        };
    }
}

export const getSeriesRecently = async (): Promise<SerieDataList> => {
    try {
        const series = await prisma.serie.findMany({
            include: {
                chapters: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 2,
                },
            },
        });

        // Ordenar as novels pelo capítulo mais recente no lado do JavaScript
        const sortedNovels = series.sort((a: SeriePlus, b: SeriePlus) => {
            const latestChapterA = a.chapters?.[0]?.createdAt || new Date(0);
            const latestChapterB = b.chapters?.[0]?.createdAt || new Date(0);
            return new Date(latestChapterB).getTime() - new Date(latestChapterA).getTime();
        }).slice(0, 20); // Limitar a 20 novels

        return { data: sortedNovels };
    } catch (error) {
        return {
            error: {
                message: "Error getting novels",
                status: 500,
                error: error,
            }
        };
    }
}

export const getRandomSerie = async (): Promise<Serie | null> => {
    // Obtenha o número total de novels no banco de dados
    const count = await prisma.serie.count();

    if (count === 0) {
        return null; // Retorna null se não houver novels no banco de dados
    }

    // Gere um número aleatório para selecionar um índice
    const randomIndex = Math.floor(Math.random() * count);

    // Busque uma novel aleatória
    const randomNovel = await prisma.serie.findMany({
        take: 1,
        skip: randomIndex,
    });

    return randomNovel.length > 0 ? randomNovel[0] : null;
};