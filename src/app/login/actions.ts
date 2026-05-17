"use server"

import {prisma} from "@/utils/prisma-connection";
import {hashPassword, verifyPassword} from "@/utils/password";
import {setSessionCookie} from "@/utils/session";
import {ServerActionResponse} from "@/utils/server-action-response";

export async function signup(formData: FormData): Promise<ServerActionResponse<string>> {
    const username = formData.get("username") as string | null;
    const password = formData.get("password") as string | null;
    const passwordRepeat = formData.get("password_repeat") as string | null;

    if (!username) {
        return {success: false, error: "email required"};
    }
    if (!password) {
        return {success: false, error: "password required"};
    }

    if (passwordRepeat !== password) {
        return {success: false, error: "passwords do not match"};
    }


    if (password.length < 8) {
        return {success: false, error: "password must be at least 8 characters"};
    }

    const existing = await prisma.user.findUnique({where: {login: username}});
    if (existing) {
        return {success: false, error: "email already in use"};
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({data: {login: username, passwordHash}});

    await setSessionCookie(user.id);
    return {success: true, payload: user.id};
}

export async function login(formData: FormData): Promise<ServerActionResponse<string>> {
    const username = formData.get("username") as string | null;
    const password = formData.get("password") as string | null;

    if (!username || !password) {
        return {success: false, error: "invalid credentials"};
    }

    const user = await prisma.user.findUnique({where: {login: username}});
    if (!user) {
        return {success: false, error: "invalid credentials"};
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
        return {success: false, error: "invalid credentials"};
    }

    await setSessionCookie(user.id);
    return {success: true, payload: user.id};
}
