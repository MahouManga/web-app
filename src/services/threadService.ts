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
            },
            user: true,
        },
    });
}