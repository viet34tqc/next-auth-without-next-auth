// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Extend globalThis
// In browsers, globalThis is equivalent to window
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// in development, tools like nodemon or hot module replacement (HMR) can cause your application to reload multiple times during runtime that
// - Invalidates the module cache
// - Causes the prismaClientSingleton() function to run again
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// In production, we can utilize the default module caching provided by the Node.js runtime
// No need to use globalThis because it can causes memory leaks
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
