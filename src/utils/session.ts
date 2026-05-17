import {cookies} from "next/headers";
import {cache} from "react";
import {SignJWT, jwtVerify} from "jose";

const secret = process.env.SESSION_SECRET;
if (!secret) {
    throw new Error("SESSION_SECRET environment variable is required");
}
const encodedKey = new TextEncoder().encode(secret);

const COOKIE_NAME = "session";

async function signSession(userId: string): Promise<string> {
    return new SignJWT({sub: userId})
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(encodedKey);
}

async function verifySession(token: string): Promise<{userId: string} | null> {
    try {
        const {payload} = await jwtVerify(token, encodedKey, {algorithms: ["HS256"]});
        if (typeof payload.sub !== "string" || payload.sub.length === 0) {
            return null;
        }
        return {userId: payload.sub};
    } catch {
        return null;
    }
}

export async function setSessionCookie(userId: string): Promise<void> {
    const token = await signSession(userId);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    });
}

export async function removeSessionCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export const getCurrentUserId = cache(async (): Promise<string | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) {
        return null;
    }
    const session = await verifySession(token);
    return session?.userId ?? null;
});
