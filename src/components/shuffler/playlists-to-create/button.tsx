'use client';

import { IconPlus } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { request } from '@/configs/request';

export const ShufflerPlaylistsToCreateButton: FC<{
  data: Pick<SpotifyApi.PlaylistObjectFull, 'name' | 'description'>;
  tracks: string[];
  accessToken: string;
}> = ({ data, tracks, accessToken }) => {
  const t = useTranslations();
  const { mutate, isPending } = useMutation({
    mutationKey: ['create-playlist'],
    mutationFn: async () => {
      const headers = { Authorization: `Bearer ${accessToken}` };

      const { id: playlistId } = await request('spotify').post('me/playlists', {
        headers,
        json: {
          description: data.description,
          name: data.name,
          public: false,
          collaborative: false,
        },
      }).json<Pick<SpotifyApi.PlaylistObjectFull, 'id'>>();

      await request('spotify').post(`playlists/${playlistId}/tracks`, {
        headers,
        json: { uris: tracks.map(track => `spotify:track:${track}`) },
      });
    },
    onSuccess: () => {
      toast.success(t('playlist.success_while_creating_playlist'));
    },
    onError: () => {
      toast.error(t('playlist.error_while_creating_playlist'));
    },
  });

  return (
    <Button
      icon={IconPlus}
      loading={{ state: isPending }}
      onClick={() => {
        mutate();
      }}
    >
      {t('playlist.create')}
    </Button>
  );
};
