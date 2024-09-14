'use client';

import { ShuffleOptions } from '@prisma/client';
import { IconArrowsShuffle } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { type FC, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { request } from '@/configs/request';

const TRACK_IS_REQUIRED_ERROR_MESSAGE = 'Track is required';

export const ShufflerPlaylistsToShuffleButton: FC<{
  id: string;
  totalTracks: number;
  accessToken: string;
}> = ({ id, totalTracks, accessToken }) => {
  const fetchAllTracks = useCallback(
    async (playlistId: string) => {
      const SPOTIFY_TRACKS_LIMIT = 100;

      let offset = 0;
      let hasNextPage = true;

      let allTracks: SpotifyApi.PlaylistTrackObject[] = [];

      while (hasNextPage) {
        const response = await request('spotify')
          .get(`playlists/${playlistId}/tracks`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            searchParams: {
              limit: SPOTIFY_TRACKS_LIMIT.toString(),
              offset: offset.toString(),
            },
          })
          .json<SpotifyApi.PlaylistTrackResponse>();

        allTracks = allTracks.concat(response.items);
        offset += SPOTIFY_TRACKS_LIMIT;

        hasNextPage = response.next !== null;
      }

      return allTracks;
    },
    [accessToken],
  );

  const t = useTranslations();
  const [selectedShuffleOption, setSelectedShuffleOption]
    = useState<ShuffleOptions>();
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleCompletionProgress, setShuffleCompletionProgress] = useState(0);

  const shuffleOptions = useMemo(
    () => [
      {
        label: t('playlist.shuffle_options.date_playlist_asc'),
        value: ShuffleOptions.DatePlaylistAsc,
      },
      {
        label: t('playlist.shuffle_options.date_playlist_desc'),
        value: ShuffleOptions.DatePlaylistDesc,
      },
      {
        label: t('playlist.shuffle_options.length_asc'),
        value: ShuffleOptions.LengthAsc,
      },
      {
        label: t('playlist.shuffle_options.length_desc'),
        value: ShuffleOptions.LengthDesc,
      },
      {
        label: t('playlist.shuffle_options.popular'),
        value: ShuffleOptions.Popular,
      },
      {
        label: t('playlist.shuffle_options.random'),
        value: ShuffleOptions.Random,
      },
    ],
    [t],
  );

  const sortTracks = useCallback(
    (tracks: SpotifyApi.PlaylistTrackObject[]) => {
      let sortedTracks = [...tracks];

      switch (selectedShuffleOption) {
        case ShuffleOptions.LengthAsc:
          sortedTracks.sort((a, b) => {
            if (!a.track || !b.track) {
              throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
            }

            return a.track.duration_ms - b.track.duration_ms;
          });

          break;
        case ShuffleOptions.LengthDesc:
          sortedTracks.sort((a, b) => {
            if (!a.track || !b.track) {
              throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
            }

            return b.track.duration_ms - a.track.duration_ms;
          });

          break;
        case ShuffleOptions.DatePlaylistAsc:
          sortedTracks.sort((a, b) => {
            if (!a.added_at || !b.added_at) {
              throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
            }

            return (
              new Date(a.added_at).getTime() - new Date(b.added_at).getTime()
            );
          });

          break;
        case ShuffleOptions.DatePlaylistDesc:
          sortedTracks.sort((a, b) => {
            if (!a.added_at || !b.added_at) {
              throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
            }

            return (
              new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
            );
          });
          break;
        case ShuffleOptions.Popular:
          sortedTracks.sort((a, b) => {
            if (!a.track || !b.track) {
              throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
            }

            return b.track.popularity - a.track.popularity;
          });
          break;
        case ShuffleOptions.Random:
          sortedTracks = tracks
            .map(a => ({ rand: Math.random(), value: a }))
            .sort((a, b) => a.rand - b.rand)
            .map(a => a.value);
          break;
      }

      return sortedTracks;
    },
    [selectedShuffleOption],
  );

  const { mutate: shuffle } = useMutation({
    mutationKey: ['playlists', id],
    mutationFn: async () => {
      let tracks = await fetchAllTracks(id);
      let sortedTracks = sortTracks(tracks);

      let processedTracksCount = 0;
      let shuffledTracksCount = 0;

      const updatedIndices = new Set<number>();

      const sendIncreaseShufflesCount = async (count: number) => {
        await request('route-handler').post('increase-shuffles-count', {
          json: { shuffleOption: selectedShuffleOption, count },
        });
      };

      for (const [i, sortedTrack] of sortedTracks.entries()) {
        if (!sortedTrack) {
          continue;
        }

        const initialTrackIndex = tracks.findIndex(({ track }) => {
          if (!track || !sortedTrack.track) {
            throw new Error(TRACK_IS_REQUIRED_ERROR_MESSAGE);
          }

          return track.id === sortedTrack.track.id;
        });

        if (
          initialTrackIndex !== -1
          && !updatedIndices.has(initialTrackIndex)
        ) {
          try {
            await request('spotify').put(`playlists/${id}/tracks`, {
              headers: { Authorization: `Bearer ${accessToken}` },
              json: {
                range_start: initialTrackIndex,
                insert_before:
                  i === sortedTracks.length - 1 ? sortedTracks.length : i + 1,
              },
            });

            updatedIndices.add(initialTrackIndex);

            processedTracksCount += 1;
            shuffledTracksCount += 1;

            setShuffleCompletionProgress(
              Number.parseFloat(
                ((processedTracksCount / sortedTracks.length) * 100).toFixed(2),
              ),
            );

            // After processing every 10 tracks, or as per the defined condition, send a request to update the shuffle count. This ensures that the shuffle count is accurately recorded and resets the count for the next batch of tracks.
            if (processedTracksCount % 10 === 0) {
              await sendIncreaseShufflesCount(shuffledTracksCount);

              shuffledTracksCount = 0;
            }

            if (selectedShuffleOption !== ShuffleOptions.Random) {
              tracks = await fetchAllTracks(id);
              sortedTracks = sortTracks(tracks);
            }
          } catch (error) {
            console.error(`Failed to update track at index ${i}:`, error);
          }
        }
      }

      // Ensure that any remaining tracks, which were processed after the last batch, have their shuffle count updated. This handles cases where the total number of tracks is not a multiple of 10 and ensures all processed tracks are counted.
      if (processedTracksCount % 10 !== 0) {
        await sendIncreaseShufflesCount(shuffledTracksCount);
      }
    },
    onSuccess: () => {
      toast.success(t('playlist.success_while_shuffling_playlist'));

      setShuffleCompletionProgress(0);
      setIsShuffling(false);
    },
    onError: () => {
      toast.error(t('playlist.error_while_shuffling_playlist'));

      setShuffleCompletionProgress(0);
      setIsShuffling(false);
    },
  });

  useEffect(() => {
    if (isShuffling && selectedShuffleOption) {
      shuffle();
    }
  }, [isShuffling, selectedShuffleOption, shuffle]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={totalTracks === 0}
          loading={{
            state: isShuffling,
            text: t('playlist.shuffle_progress', {
              percent: shuffleCompletionProgress,
            }),
          }}
          icon={IconArrowsShuffle}
        >
          {t('playlist.shuffle')}
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
