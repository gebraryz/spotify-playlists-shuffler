// https://github.com/prisma/prisma/issues/5007#issuecomment-618433162

import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line ts/no-namespace
declare namespace globalThis {
  let prisma: PrismaClient;
}

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }

  prisma = globalThis.prisma;
}

export { prisma };
