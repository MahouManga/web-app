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
                    citingPosts: {
                        include: {
                            citedPost: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: 'asc',
                },
            },
            user: true,
        },
    });
}


export async function createPost(threadId: string, userId: string, content: string, citedPosts?: { id: string }[]) {
    // Criar o post principal
    const post = await prisma.threadPost.create({
        data: {
            threadId,
            content,
            userId,
        },
    });

    // Se houver posts citados, criar registros na tabela PostCitation
    if (citedPosts && citedPosts.length > 0) {
        await prisma.postCitation.createMany({
            data: citedPosts.map((citedPost) => ({
                citingPostId: post.id,    // O novo post que está fazendo a citação
                citedPostId: citedPost.id // O ID do post que está sendo citado
            })),
        });
    }

    return post;
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