import type { FC } from 'react';

import { ContentContainer } from '../../content-container';
import { ShufflerPlaylist } from '../playlist';
import { ShufflerPlaylistsToShuffleButton } from './button';
import { ShufflerPlaylistsToShuffleSearch } from './search';

export const ShufflerPlaylistsToShuffle: FC<{
  accessToken: string;
  playlists: SpotifyApi.PlaylistObjectFull[];
}> = ({ playlists, accessToken }) => {
  const filteredPlaylists = playlists
    .filter(playlist => !playlist.public)
    .sort((a, b) => (a.tracks.total > b.tracks.total ? -1 : 1));

  return (
    <ContentContainer className="space-y-6">
      <ShufflerPlaylistsToShuffleSearch
        randomPlaylistName={
          filteredPlaylists[
            Math.floor(Math.random() * filteredPlaylists.length)
          ]?.name
        }
      />
      {filteredPlaylists.map((playlist) => {
        const playlistId = playlist.id;

        return (
          <ShufflerPlaylist
            key={playlistId}
            data={{
              id: playlistId,
              name: playlist.name,
              images: playlist.images,
              total: playlist.tracks.total,
            }}
            actionButton={(
              <ShufflerPlaylistsToShuffleButton
                id={playlistId}
                totalTracks={playlist.tracks.total}
                accessToken={accessToken}
              />
            )}
          />
        );
      })}
    </ContentContainer>
  );
};
