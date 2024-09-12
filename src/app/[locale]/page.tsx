import { HTTPError } from 'ky';
import { getServerSession } from 'next-auth/next';
import { signOut } from 'next-auth/react';
import type { FC } from 'react';

import { LogIn } from '@/components/log-in';
import { Page } from '@/components/page';
import { Shuffler } from '@/components/shuffler';
import { nextAuthOptions } from '@/configs/next-auth';
import { request } from '@/configs/request';

const HomePage: FC<{
  searchParams: { search: string };
}> = async ({ searchParams }) => {
  const user = await getServerSession(nextAuthOptions);

  if (user) {
    try {
      const playlists = await request
        .get('me/playlists', {
          headers: { Authorization: `Bearer ${user.user.accessToken}` },
        })
        .json<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectFull>>();

      const filteredPlaylists = searchParams.search
        ? playlists.items.filter(playlist =>
          playlist.name.toLowerCase().includes(searchParams.search.toLowerCase()),
        )
        : playlists.items;

      return (
        <Page>
          <Shuffler user={user.user} playlists={filteredPlaylists} />
        </Page>
      );
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 401) {
        await signOut();
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  }

  return (
    <Page>
      <LogIn />
    </Page>
  );
};

export default HomePage;
