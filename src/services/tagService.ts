import prisma from '@/lib/db';

import { Tag } from '@prisma/client';


interface TagData {
    data?: Tag;
    error?: ErrorData;
}

interface TagInputData {
    id?: string;
    name: string;
    text: string;
}

interface TagDataList {
    data?: Tag[];
    error?: ErrorData;
}

interface ErrorData {
    message: string;
    status: number;
    error?: any;
}


export const getTags = async (search?: string): Promise<TagDataList> => {
    try {
        const tags = await prisma.tag.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        })
        return { data: tags };
    } catch (error) {
        return {
            error: {
                message: "Error fetching tags",
                status: 500,
            }
        }
    }
}


export const getTag = async (id: string): Promise<TagData> => {
    try {
        const tag = await prisma.tag.findUnique({
            where: {
                id
            }
        });
        if (!tag) {
            return {
                error: {
                    message: "Tag not found",
                    status: 404,
                }
            }
        }
        return { data: tag };
    } catch (error) {
        return {
            error: {
                message: "Error fetching tag",
                status: 500,
            }
        }
    }
}


export const createTag = async (data: TagInputData): Promise<TagData> => {
    try {
        const tag = await prisma.tag.create({
            data
        });
        return { data: tag };
    } catch (error) {
        return {
            error: {
                message: "Error creating tag",
                status: 500,
            }
        }
    }
}


export const updateTag = async (id: string, data: Tag): Promise<TagData> => {
    try {
        const updatedTag = await prisma.tag.update({
            where: {
                id
            },
            data
        });
        return { data: updatedTag };
    } catch (error) {
        return {
            error: {
                message: "Error deleting tag",
                status: 500,
            }
        }
    }
}


export const deleteTag = async (id: string): Promise<TagData> => {
    try {
        const tag = await prisma.tag.delete({
            where: {
                id
            }
        });
        return { data: tag };
    } catch (error) {
        return {
            error: {
                message: "Error deleting tag",
                status: 500,
            }
        }
    }
}