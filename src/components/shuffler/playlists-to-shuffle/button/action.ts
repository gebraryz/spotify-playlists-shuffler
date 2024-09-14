'use server';

import crypto from 'node:crypto';

import type { ShuffleOptions } from '@prisma/client';

import { prisma } from '@/configs/prisma';

export const increaseShufflesCount = async (shuffleOption: ShuffleOptions) => {
  await prisma.playlistShuffle.create({
    data: {
      id: crypto.randomBytes(16).toString('hex'),
      shuffledAt: new Date(),
      shuffleOption,
    },
  });
};
