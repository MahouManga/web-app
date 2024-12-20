import prisma from "@/lib/db";

import { Forum, ForumCategory } from "@prisma/client";

export const getCategorys = async () => {
    try {
        const categories = await prisma.forumCategory.findMany({
            include: {
                forums: {
                    include: {
                        subForums: {
                            include: {
                                subForums: true, // Adjust as needed for deeper nesting
                            },
                        },
                    },
                    where: {
                        parentForumId: null,
                    },
                },
            },
            orderBy: {
                position: 'asc',
            },
        });

        return categories;
    } catch (error) {
        return {
            error: {
                message: "Error getting Categorys",
                status: 500,
            }
        }
    }
}

export const createCategory = async (name: string) => {
    try {
        // Get the current max position
        const maxPositionCategory = await prisma.forumCategory.findFirst({
            orderBy: {
                position: 'desc',
            },
        });
        const newPosition = maxPositionCategory ? maxPositionCategory.position + 1 : 1;

        const newCategory = await prisma.forumCategory.create({
            data: {
                name,
                position: newPosition,
            },
        });

        return newCategory;
    } catch (error) {
        return {
            error: {
                message: "Error creating Category",
                status: 500,
            }
        }
    }
}

export const updateCategory = async (id: string, name: string) => {
    const category = await prisma.forumCategory.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });

    return category;
}

export const updateForum = async (id: number, title: string, description?: string, allowTopics?: boolean, isPublic?: boolean, categoryId?: string, parentForumId?: number) => {
    const forum = await prisma.forum.update({
        where: {
            id,
        },
        data: {
            title,
            description: description || '',
            allowTopics: allowTopics ?? true,
            isPublic: isPublic ?? true,
            category: categoryId ? { connect: { id: categoryId } } : undefined,
            parentForum: parentForumId ? { connect: { id: parentForumId } } : undefined,
        },
        include: {
            subForums: true,
        },
    });

    return forum;
}

export const createForum = async (title: string, description?: string, allowTopics?: boolean, isPublic?: boolean, categoryId?: string, parentForumId?: number) => {
    const newForum = await prisma.forum.create({
        data: {
            title,
            description: description || '',
            allowTopics: allowTopics ?? true,
            isPublic: isPublic ?? true,
            category: categoryId ? { connect: { id: categoryId } } : undefined,
            parentForum: parentForumId ? { connect: { id: parentForumId } } : undefined,
        },
        include: {
            subForums: true,
        },
    });

    return newForum;
}

export const getForumByID = async (id: number) => {
    const forum = await prisma.forum.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            subForums: true,
            threads: true,
        },
    });

    return forum;
}

export async function getUserForumPosts(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const posts = await prisma.threadPost.findMany({
        where: { userId },
        skip,
        take: limit,
        include: {
            user: true,   // Inclui informações do autor do post
            thread: true, // Inclui informações da thread associada
            citedPosts: {
                include: {
                    citedPost: {
                        include: {
                            user: true, // Inclui informações do autor do post citado
                        },
                    },
                }
            }, // Inclui as postagens que este post cita
        },
    });

    const totalPosts = await prisma.threadPost.count({ where: { userId } });
    const totalPages = Math.ceil(totalPosts / limit);

    return {
        posts,
        totalPages,
    };
}