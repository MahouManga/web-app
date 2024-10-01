import prisma from '@/lib/db';

import { Genre } from '@prisma/client';

interface GenreData {
    data?: Genre;
    error?: ErrorData;
}

interface GenreInputData {
    id?: number;
    name: string;
    text: string;
}

interface GenreDataList {
    data?: Genre[];
    error?: ErrorData;
}

interface ErrorData {
    message: string;
    status: number;
    error?: any;
}

export const getGenres = async (): Promise<GenreDataList> => {
    try {
        const genres = await prisma.genre.findMany();
        return { data: genres };
    } catch (error) {
        return {
            error: {
                message: "Error fetching genres",
                status: 500,
            }
        };
    }
}

export const getGenres2 = async (): Promise<Genre[]> => {
    try {
        const genres = await prisma.genre.findMany();
        return genres;
    } catch (error) {
        throw new Error("Failed to fetch genres");
    }
}

export const getGenre = async (id: number): Promise<GenreData> => {
    try {
        const genre = await prisma.genre.findUnique({
            where: {
                id,
            },
        })

        if (!genre) {
            return {
                error: {
                    message: "Genre not found",
                    status: 404,
                }
            }
        }

        return { data: genre };
    } catch (error) {
        return {
            error: {
                message: "Error fetching genre",
                status: 500,
            }
        }
    }
}

export const createGenre = async (data: GenreInputData): Promise<GenreData> => {
    try {
        const genre = await prisma.genre.create({
            data,
        });
        return { data: genre };
    } catch (error) {
        return {
            error: {
                message: "Error creating genre",
                status: 500,
                error: error
            }
        }
    }
}

export const deleteGenre = async (id: number): Promise<GenreData> => {
    try {
        const genre = await prisma.genre.delete({
            where: {
                id,
            },
        });
        return { data: genre };
    } catch (error) {
        return {
            error: {
                message: "Error deleting genre",
                status: 500,
            }
        }
    }
}

export const updateGenre = async (id: number, data: Genre): Promise<GenreData> => {
    try {
        const updatedGenre = await prisma.genre.update({
            where: {
                id: id
            },
            data
        });
        return { data: updatedGenre };
    } catch (error) {
        return {
            error: {
                message: "Error deleting genre",
                status: 500,
            }
        }
    }
}