"use server";

import db from "@/lib/db";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { ActionResult } from "next/dist/server/app-render/types";

export default async function Page() { }

export async function signup(_: any, formData: FormData): Promise<ActionResult> {
    const username = formData.get("username");
    const name = formData.get("name");
    const password = formData.get("password");
    const email = formData.get("email");
    // Validação de e-mail
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
            type: "email",
            error: "Invalid email"
        };
    }
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (typeof username !== "string" || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
        return {
            type: "username",
            error: "Invalid username"
        };
    }
    if (typeof name !== "string" || name.length === 0) {
        return {
            type: "name",
            error: "Put a name"
        };
    }
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            type: "password",
            error: "Invalid password"
        };
    }

    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    const userId = generateIdFromEntropySize(10); // 16 characters long



    const existingUser = await db.user.findFirst({
        where: {
            OR: [{ username: username }, { email: email }]
        }
    });

    if (existingUser) {
        return (
            {
                type: "incorrect",
                error: "Username or email already in use"
            }
        )
    }

    // TODO: check if username is already used
    await db.user.create({
        data: {
            id: userId,
            username: username,
            email: email,
            name: name,
            password: passwordHash,
        }
    })

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}