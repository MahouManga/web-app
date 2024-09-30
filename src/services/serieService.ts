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

interface ErrorData {
    message: string;
    status: number;
    error?: any;
}

interface SerieData {
    data?: SeriePlus;
    error?: ErrorData;
}

interface SerieCreateInput {
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
                    _count: sort,
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
        const authorsData = data.authors?.map((author: { name: string }) => ({ name: author.name })) || [];
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
                authors: {
                    create: authorsData,
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