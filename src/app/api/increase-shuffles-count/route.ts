import crypto from 'node:crypto';

import type { ShuffleOptions } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const POST = async (request: Request) => {
  const data = await request.json() as { shuffleOption: ShuffleOptions };

  if (!data.shuffleOption) {
    return new Response('Shuffle option is required', { status: 400 });
  }

  await new PrismaClient().playlistShuffle.create({
    data: {
      id: crypto.randomBytes(16).toString('hex'),
      shuffledAt: new Date(),
      shuffleOption: data.shuffleOption,
    },
  });

  return new Response('Shuffle count increased', { status: 201 });
};
