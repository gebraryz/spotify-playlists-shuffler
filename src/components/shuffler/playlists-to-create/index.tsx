import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ContentContainer } from '@/components/content-container';

import { ShufflerPlaylist } from '../playlist';
import { ShufflerPlaylistsToCreateButton } from './button';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_DATE = new Date().toISOString().slice(0, 10);

export const ShufflerPlaylistsToCreate: FC<{ accessToken: string }> = ({
  accessToken,
}) => {
  const t = useTranslations();

  const data: {
    id: string;
    name: string;
    description: string;
    availableAt: string[];
    tracks: string[];
  }[] = [
    {
      id: 'motivation-to-never-give-up',
      name: t('playlists_recommendations_names.motivation_to_never_give_up'),
      description: '🎵 We\'re no strangers to love...',
      availableAt: [`${CURRENT_YEAR}-06-27`, `${CURRENT_YEAR}-04-01`],
      tracks: ['4cOdK2wGLETKBW3PvgPWqT'], // "Never Gonna Give You Up" by Rick Astley
    },
  ];

  const areTracksAvailable = data.some(item =>
    item.availableAt.includes(CURRENT_DATE),
  );

  return areTracksAvailable
    ? (
        <ContentContainer>
          {data
            .filter(item => item.availableAt.includes(new Date().toISOString().slice(0, 10)))
            .map(item => (
              <ShufflerPlaylist
                key={item.id}
                data={{ id: item.id, images: [], name: item.name, total: '???' }}
                actionButton={(
                  <ShufflerPlaylistsToCreateButton
                    accessToken={accessToken}
                    data={{ name: item.name, description: item.description }}
                    tracks={item.tracks}
                  />
                )}
              />
            ))}
        </ContentContainer>
      )
    : null;
};
