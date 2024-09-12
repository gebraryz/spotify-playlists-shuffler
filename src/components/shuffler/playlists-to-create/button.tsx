'use client';

import { IconPlus } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { request } from '@/configs/request';
import { useToast } from '@/hooks/use-toast';

export const ShufflerPlaylistsToCreateButton: FC<{
  data: Pick<SpotifyApi.PlaylistObjectFull, 'name' | 'description'>;
  tracks: string[];
  accessToken: string;
}> = ({ data, tracks, accessToken }) => {
  const t = useTranslations();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: ['create-playlist'],
    mutationFn: async () => {
      const headers = { Authorization: `Bearer ${accessToken}` };

      const { id: playlistId } = await request.post('me/playlists', {
        headers,
        json: {
          description: data.description,
          name: data.name,
          public: false,
          collaborative: false,
        },
      }).json<Pick<SpotifyApi.PlaylistObjectFull, 'id'>>();

      await request.post(`playlists/${playlistId}/tracks`, {
        headers,
        json: { uris: tracks.map(track => `spotify:track:${track}`) },
      });
    },
    onSuccess: () => {
      toast({ title: 'Pomyślnie dodano playlistę' });
    },
    onError: () => {
      toast({ title: 'Wystąpił błąd podczas dodawania playlisty' });
    },
  });

  return (
    <Button
      icon={IconPlus}
      loading={isPending}
      onClick={() => {
        mutate();
      }}
    >
      {t('create_playlist')}
    </Button>
  );
};
