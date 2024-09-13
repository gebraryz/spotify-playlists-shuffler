import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ContentContainer } from '../content-container';
import spotifyLogo from './assets/spotify-logo.png';
import { LogInButton } from './button';

export const LogIn: FC = () => {
  const t = useTranslations();

  return (
    <ContentContainer className="grid p-0 desktop:grid-cols-2">
      <div className="flex flex-col justify-center gap-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{t('app.title')}</h1>
          <p className="text-muted-foreground">{t('app.description')}</p>
        </div>
        <LogInButton className="w-fit bg-[#1db954] hover:bg-[#1db954]/90" />
      </div>
      <div className="hidden items-center justify-center rounded-b-md rounded-l-none bg-black p-4 dark:bg-secondary desktop:flex desktop:rounded-r-md desktop:p-12">
        <div className="relative size-[200px] desktop:size-[275px]">
          <Image src={spotifyLogo.src} alt="Spotify logo" fill />
        </div>
      </div>
    </ContentContainer>
  );
};
