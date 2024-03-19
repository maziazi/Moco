import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient ()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma

export const db = prisma;
