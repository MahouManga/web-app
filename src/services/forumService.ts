import prisma from "@/lib/db";

import { Forum, ForumCategory } from "@prisma/client";

export const getCategorys = async () => {
    return prisma.forumCategory.findMany();
}

export const createCategory = async (name: string) => {
    return prisma.forumCategory.create({ data: { name } });
}