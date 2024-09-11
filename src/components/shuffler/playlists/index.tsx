'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { request } from '@/configs/request';

import { ContentContainer } from '../../content-container';
import { Skeleton } from '../../ui/skeleton';
import { ShufflerUserPlaylistsShuffleButton } from './shuffle-button';

export const ShufflerUserPlaylists: FC<{ accessToken: string }> = ({
  accessToken,
}) => {
  const t = useTranslations();
  const { data, isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () =>
      request
        .get('me/playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .json<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectFull>>(),
  });

  return (
    <ContentContainer>
      {isLoading
        ? (
            <Skeleton className="h-[500px]" />
          )
        : (
            <div className="space-y-6">
              {data
              && data.items
                .filter(playlist => !playlist.public)
                .sort((a, b) => (a.tracks.total > b.tracks.total ? -1 : 1))
                .map((playlist) => {
                  const name = t('playlist', { name: playlist.name });
                  const image
                  = playlist.images && playlist.images[0]
                    ? playlist.images[0].url
                    : null;

                  return (
                    <div
                      className="flex flex-col gap-y-3 rounded-md border p-4 desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-y-0"
                      key={playlist.id}
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
                          <h3 className="text-xl">{playlist.name}</h3>
                          <p className="text-muted-foreground">
                            {playlist.tracks.total}
                            {' '}
                            piosenek
                          </p>
                        </div>
                      </div>
                      <ShufflerUserPlaylistsShuffleButton
                        id={playlist.id}
                        totalTracks={playlist.tracks.total}
                        accessToken={accessToken}
                      />
                    </div>
                  );
                })}
            </div>
          )}
    </ContentContainer>
  );
};
