"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ActionResult } from "next/dist/server/app-render/types";

export async function login(_: any, formData: FormData): Promise<ActionResult> {
	const identifier = formData.get("identifier"); // Pode ser username ou e-mail
	const password = formData.get("password");

	// Validação de identifier (pode ser username ou email)
	if (typeof identifier !== "string" || identifier.length < 3 || identifier.length > 255) {
		return {
			type: "username",
			error: "Invalid username or email"
		};
	}

	// Validação de password
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			type: "password",
			error: "Invalid password"
		};
	}

	// Busca o usuário por e-mail ou nome de usuário
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [
				{ username: identifier.toLowerCase() }, // Se for nome de usuário
				{ email: identifier.toLowerCase() }     // Se for e-mail
			]
		}
	});

	if (!existingUser) {
		return {
			type: "incorrect",
			error: "Incorrect username, email, or password!"
		};
	}

	// Verifica a senha
	const validPassword = await verify(existingUser.password, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	if (!validPassword) {
		return {
			type: "incorrect",
			error: "Incorrect username, email or password!"
		};
	}

	// Criação de sessão usando Lucia Auth
	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	// Redireciona para a página inicial após login bem-sucedido
	return redirect("/");
}