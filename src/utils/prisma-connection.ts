import {PrismaBetterSqlite3} from "@prisma/adapter-better-sqlite3";
import {PrismaClient} from "../../prisma/generated/prisma/client";

export function getPrismaClient() {
    if (!(globalThis as any).prisma as any) {

        const adapter = new PrismaBetterSqlite3({
            url: process.env.DATABASE_URL
        });

        (globalThis as any).prisma = new PrismaClient({
            adapter,
        });
    }


    return (globalThis as any).prisma as PrismaClient
}