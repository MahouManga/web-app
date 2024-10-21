import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function getUserByUsername(username: string) {
    return await prisma.user.findFirst({
        where: {
            username
        }
    })
}