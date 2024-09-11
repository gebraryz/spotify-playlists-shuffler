'use client';

import { IconArrowsShuffle } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { type FC, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { request } from '@/configs/request';
import { useToast } from '@/hooks/use-toast';

enum ShuffleOptions {
  DatePlaylistAsc = 'date_playlist_asc',
  DatePlaylistDesc = 'date_playlist_desc',
  LengthAsc = 'length_asc',
  LengthDesc = 'length_desc',
  Popular = 'popular',
  Random = 'random',
}

const TRACK_IS_REQUIRED_ERROR_MESSAGE = 'Track is required';

export const ShufflerUserPlaylistsShuffleButton: FC<{
  id: string;
  totalTracks: number;
  accessToken: string;
}> = ({ id, totalTracks, accessToken }) => {
  const t = useTranslations();
  const [selectedShuffleOption, setSelectedShuffleOption]
    = useState<ShuffleOptions>();
  const [isShuffling, setIsShuffling] = useState(false);
  const { toast } = useToast();

  const fetchAllTracks = async (playlistId: string) => {
    const SPOTIFY_TRACKS_LIMIT = 100;

    let offset = 0;

    let response;
    let allTracks: SpotifyApi.PlaylistTrackObject[] = [];

    do {
      response = await request
        .get(`playlists/${playlistId}/tracks`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          searchParams: {
            limit: SPOTIFY_TRACKS_LIMIT.toString(),
            offset: offset.toString(),
          },
        })
        .json<SpotifyApi.PlaylistTrackResponse>();

      offset += SPOTIFY_TRACKS_LIMIT;
      allTracks = allTracks.concat(response.items);
    } while (response.items.length === SPOTIFY_TRACKS_LIMIT);

    return allTracks;
  };

  const { mutate } = useMutation({
    mutationKey: ['playlists', id],
    mutationFn: async () => {
      const tracks = await fetchAllTracks(id);

      let sortedTracks = [...tracks];

      switch (selectedShuffleOption) {
        case ShuffleOptions.LengthAsc:
          sortedTracks.sort(
            (a, b) => {
              if (!a.track || !b.track) {
                throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
              }

              return a.track.duration_ms - b.track.duration_ms;
            },
          );

          break;
        case ShuffleOptions.LengthDesc:
          sortedTracks.sort(
            (a, b) => {
              if (!a.track || !b.track) {
                throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
              }

              return b.track.duration_ms - a.track.duration_ms;
            },
          );

          break;
        case ShuffleOptions.DatePlaylistAsc:
          sortedTracks.sort(
            (a, b) => {
              if (!a.added_at || !b.added_at) {
                throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
              }

              return new Date(a.added_at).getTime() - new Date(b.added_at).getTime();
            },
          );

          break;

        case ShuffleOptions.DatePlaylistDesc:
          sortedTracks.sort(
            (a, b) => {
              if (!a.added_at || !b.added_at) {
                throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
              }

              return new Date(b.added_at).getTime() - new Date(a.added_at).getTime();
            },
          );

          break;
        case ShuffleOptions.Popular:
          sortedTracks.sort(
            (a, b) => {
              if (!a.track || !b.track) {
                throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
              }

              return b.track.popularity - a.track.popularity;
            },
          );

          break;
        case ShuffleOptions.Random:
          // Code from https:// github.com/sodiray/radash/blob/069b26cdd7d62e6ac16a0ad3baa1c9abcca420bc/src/random.ts#L23
          sortedTracks = tracks
            .map(a => ({ rand: Math.random(), value: a }))
            .sort((a, b) => a.rand - b.rand)
            .map(a => a.value);

          break;
      }

      for (let i = 0; i < sortedTracks.length; i++) {
        const sortedTrack = sortedTracks[i];

        if (sortedTrack) {
          const initialTrackIndex = tracks.findIndex(({ track }) => {
            if (!track) {
              throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
            }

            if (!sortedTrack.track) {
              throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
            }

            return track.id === sortedTrack.track.id;
          });

          if (initialTrackIndex !== -1) {
            await request.put(`playlists/${id}/tracks`, {
              headers: { Authorization: `Bearer ${accessToken}` },
              body: JSON.stringify({
                range_start: initialTrackIndex,
                insert_before: i === sortedTracks.length - 1 ? sortedTracks.length : i + 1,
              }),
            });
          }
        }
      }
    },
    onSuccess: () => {
      toast({ title: t('successfully_shuffled_playlist') });

      setIsShuffling(false);
    },
    onError: () => {
      toast({ title: t('could_not_shuffle_playlist') });

      setIsShuffling(false);
    },
  });

  useEffect(() => {
    if (isShuffling && selectedShuffleOption) {
      mutate();
    }
  }, [isShuffling, selectedShuffleOption, mutate]);

  const shuffleOptions = [
    {
      label: t('shuffle_options_date_playlist_asc'),
      value: ShuffleOptions.DatePlaylistAsc,
    },
    {
      label: t('shuffle_options_date_playlist_desc'),
      value: ShuffleOptions.DatePlaylistDesc,
    },
    {
      label: t('shuffle_options_length_asc'),
      value: ShuffleOptions.LengthAsc,
    },
    {
      label: t('shuffle_options_length_desc'),
      value: ShuffleOptions.LengthDesc,
    },
    {
      label: t('shuffle_options_popular'),
      value: ShuffleOptions.Popular,
    },
    {
      label: t('shuffle_options_random'),
      value: ShuffleOptions.Random,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={totalTracks === 0}
          loading={isShuffling}
          icon={IconArrowsShuffle}
        >
          {t('shuffle')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {shuffleOptions.map(option => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              setSelectedShuffleOption(option.value);
              setIsShuffling(true);
            }}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
