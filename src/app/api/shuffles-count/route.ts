import { prisma } from '@/configs/prisma';

export const revalidate = 0;

export const GET = async () => {
  const totalShuffles = await prisma.playlistShuffle.count();
  const totalShufflesInLast24Hours = await prisma.playlistShuffle.count({
    where: {
      shuffledAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  return Response.json({ totalShufflesInLast24Hours, totalShuffles });
};
