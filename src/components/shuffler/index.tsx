import type { Session } from 'next-auth';
import type { FC } from 'react';

import { ShufflerUserPlaylists } from './playlists';
import { ShufflerUserInformation } from './user-information';

export const Shuffler: FC<{ data: Session['user'] }> = ({ data }) => (
  <div className="space-y-8">
    <ShufflerUserInformation data={data} />
    <ShufflerUserPlaylists accessToken={data.accessToken} />
  </div>
);
