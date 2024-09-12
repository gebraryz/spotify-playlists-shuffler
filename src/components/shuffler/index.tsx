import type { Session } from 'next-auth';
import type { FC } from 'react';

import { ShufflerPlaylistsToCreate } from './playlists-to-create';
import { ShufflerPlaylistsToShuffle } from './playlists-to-shuffle';
import { ShufflerUserInformation } from './user-information';

export const Shuffler: FC<{ user: Session['user']; playlists: SpotifyApi.PlaylistObjectFull[] }> = ({
  user,
  playlists,
}) => {
  const { accessToken } = user;

  return (
    <div className="space-y-8">
      <ShufflerUserInformation data={user} />
      <ShufflerPlaylistsToCreate accessToken={accessToken} />
      <ShufflerPlaylistsToShuffle playlists={playlists} accessToken={accessToken} />
    </div>
  );
};
