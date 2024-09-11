'use client';

import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';

import { request } from '@/configs/request';

import { ContentContainer } from '../../content-container';
import { Skeleton } from '../../ui/skeleton';
import { ShufflerUserPlaylistsItem } from './item';

export const ShufflerUserPlaylists: FC<{ accessToken: string }> = ({
  accessToken,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () =>
      request
        .get('me/playlists', {
          headers: { Authorization: `Bearer ${accessToken}` },
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
                .map(playlist => (
                  <ShufflerUserPlaylistsItem
                    data={playlist}
                    accessToken={accessToken}
                    key={playlist.id}
                  />
                ))}
            </div>
          )}
    </ContentContainer>
  );
};
