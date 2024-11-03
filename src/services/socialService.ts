import prisma from '@/lib/db';


// Seguir um usuário
export async function followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
        throw new Error("You can't follow yourself.");
    }

    // Verifica se o relacionamento já existe
    const existingFollow = await prisma.follower.findUnique({
        where: {
            followerId_followingId: {
                followerId,
                followingId,
            },
        },
    });

    if (existingFollow) {
        throw new Error("You are already following this user.");
    }

    return await prisma.follower.create({
        data: {
            followerId,
            followingId,
        },
    });
}

// Deixar de seguir um usuário
export async function unfollowUser(followerId: string, followingId: string) { // User, Following
    return await prisma.follower.deleteMany({
        where: {
            followerId,
            followingId,
        },
    });
}

// Listar os seguidores de um usuário
export async function getFollowers(userId: string) {
    return await prisma.follower.findMany({
        where: { followingId: userId },
        select: {
            follower: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
}

// Listar quem um usuário está seguindo
export async function getFollowing(userId: string) {
    return await prisma.follower.findMany({
        where: { followerId: userId },
        select: {
            following: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
}

// Verificar se o usuário já está seguindo outro
export async function isFollowing(followerId: string, followingId: string) {
    const follow = await prisma.follower.findUnique({
        where: {
            followerId_followingId: {
                followerId,
                followingId,
            },
        },
    });
    return follow !== null;
}

// Obter quantidade de seguidores de um usuário
export async function getFollowerCount(userId: string) {
    return await prisma.follower.count({
        where: { followingId: userId },
    });
}

// Obter quantidade de usuários que um usuário está seguindo
export async function getFollowingCount(userId: string) {
    return await prisma.follower.count({
        where: { followerId: userId },
    });
}
