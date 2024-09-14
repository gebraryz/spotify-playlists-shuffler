-- CreateEnum
CREATE TYPE "shuffle_options" AS ENUM ('DatePlaylistAsc', 'DatePlaylistDesc', 'LengthAsc', 'LengthDesc', 'Popular', 'Random');

-- CreateTable
CREATE TABLE "playlist_shuffles" (
    "id" TEXT NOT NULL,
    "shuffle_option" "shuffle_options" NOT NULL,
    "shuffled_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "playlist_shuffles_pkey" PRIMARY KEY ("id")
);
