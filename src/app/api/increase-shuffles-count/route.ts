import crypto from 'node:crypto';

import type { ShuffleOptions } from '@prisma/client';

import { prisma } from '@/configs/prisma';

export const POST = async (request: Request) => {
  const data = await request.json() as { shuffleOption: ShuffleOptions; count: number };

  if (!data.shuffleOption) {
    return new Response('Shuffle option is required', { status: 400 });
  }

  if (!data.count) {
    return new Response('Count is required', { status: 400 });
  }

  for (let i = 0; i < data.count; i++) {
    await prisma.playlistShuffle.create({
      data: {
        id: crypto.randomUUID(),
        shuffleOption: data.shuffleOption,
        shuffledAt: new Date(),
      },
    });
  }

  return new Response('Shuffle count increased', { status: 201 });
};
