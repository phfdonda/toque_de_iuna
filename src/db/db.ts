import {PrismaClient} from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
}

declare global {
    var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

if(process.env.NODE_ENV !== 'production') globalThis.prisma = db;