import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ShufflerUserPlaylistsItemShuffleButton } from './shuffle-button';

export const ShufflerUserPlaylistsItem: FC<{
  data: SpotifyApi.PlaylistObjectFull;
  accessToken: string;
}> = ({ data, accessToken }) => {
  const t = useTranslations();

  const name = t('playlist', { name: data.name });
  const image
  = data.images && data.images[0]
    ? data.images[0].url
    : null;

  return (
    <div
      className="flex flex-col gap-y-3 rounded-md border p-4 desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-y-0"
    >
      <div className="flex gap-x-6 desktop:items-center">
        {image
          ? (
              <div className="relative size-[45px] shrink-0 desktop:size-[50px]">
                <Image
                  className="rounded-full"
                  src={image}
                  title={name}
                  alt={name}
                  fill
                />
              </div>
            )
          : (
              <div className="size-[50px] rounded-full bg-black" />
            )}
        <div className="space-y-1">
          <h3 className="text-xl">{name}</h3>
          <p className="text-muted-foreground">
            {t('total_tracks', { count: data.tracks.total })}
          </p>
        </div>
      </div>
      <ShufflerUserPlaylistsItemShuffleButton
        id={data.id}
        totalTracks={data.tracks.total}
        accessToken={accessToken}
      />
    </div>
  );
};
