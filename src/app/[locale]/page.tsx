import { HTTPError } from 'ky';
import { getServerSession } from 'next-auth/next';
import { signOut } from 'next-auth/react';
import type { FC } from 'react';

import { Faq } from '@/components/faq';
import { LogIn } from '@/components/log-in';
import { Shuffler } from '@/components/shuffler';
import { Statististics } from '@/components/statistics';
import { nextAuthOptions } from '@/configs/next-auth';
import { request } from '@/configs/request';

const HomePage: FC<{
  searchParams: { search: string };
}> = async ({ searchParams }) => {
  const session = await getServerSession(nextAuthOptions);

  let jsxContent;

  if (session) {
    try {
      const playlists = await request('spotify')
        .get('me/playlists', {
          headers: { Authorization: `Bearer ${session.user.accessToken}` },
        })
        .json<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectFull>>();

      const filteredPlaylists = searchParams.search
        ? playlists.items.filter(playlist =>
          playlist.name
            .toLowerCase()
            .includes(searchParams.search.toLowerCase()),
        )
        : playlists.items;

      jsxContent = <Shuffler user={session.user} playlists={filteredPlaylists} />;
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 401) {
        signOut();
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  } else {
    jsxContent = <LogIn />;
  }

  return (
    <>
      {jsxContent}
      <Statististics />
      <Faq />
    </>
  );
};

export default HomePage;
