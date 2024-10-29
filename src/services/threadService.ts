import prisma from "@/lib/db";

export function createTopic(
    title: string,
    content: string,
    forumId: number,
    userId: string
) {
    return prisma.thread.create({
        data: {
            title,
            forumId,
            userId,
            posts: {
                create: {
                    content,
                    userId,
                },
            },
        },
        include: {
            posts: true, // Inclui o post inicial na resposta
        },
    });
}

export function getTopicByID(threadId: string) {
    return prisma.thread.findUnique({
        where: {
            id: threadId,
        },
        include: {
            posts: {
                include: {
                    user: true,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            },
            user: true,
        },
    });
}

export function createPost(threadId: string, userId: string, content: string, citingPostId?: string[]) {
    return prisma.threadPost.create({
        data: {
            threadId,
            content,
            userId,
            ...(citingPostId && citingPostId.length > 0
                ? {
                    citingPosts: {
                        connect: citingPostId.map(id => ({ id }))
                    }
                }
                : {}),
        },
    });
}

export function updatePost(
    userId: string,
    postId: string,
    content: string
) {
    return prisma.threadPost.update({
        where: {
            id: postId,
            userId: userId,
        },
        data: {
            content,
        },
    });
}