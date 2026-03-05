import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    if (process.env.NEXT_PHASE === "phase-production-build") {
        return {
            game: {
                findMany: async () => [],
                upsert: async () => ({}),
                findUnique: async () => null,
            },
            $disconnect: async () => { },
        } as any;
    }

    if (process.env.NODE_ENV !== "production") {
        // In development, ensure we have the env vars loaded for the client
        require("dotenv").config();
        console.log("DEBUG: DATABASE_URL is", process.env.DATABASE_URL);
    }

    return new PrismaClient();
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
