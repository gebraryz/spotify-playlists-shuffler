import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ContentContainer } from '../content-container';
import spotifyLogo from './assets/spotify-logo.png';
import { LogInButton } from './button';

export const LogIn: FC = () => {
  const t = useTranslations();

  return (
    <ContentContainer className="grid desktop:grid-cols-2 desktop:gap-x-14 desktop:p-0">
      <div className="flex flex-col justify-center gap-y-8 px-0 py-8 desktop:px-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{t('app.title')}</h1>
          <p className="text-muted-foreground">{t('app.description')}</p>
        </div>
        <LogInButton className="w-full bg-spotify hover:bg-spotify-hover" />
      </div>
      <div className="hidden items-center justify-center rounded-b-xl rounded-l-none border-l-border bg-black p-4 dark:border-l dark:bg-secondary desktop:flex desktop:rounded-r-xl desktop:p-12">
        <div className="relative size-[200px] desktop:size-[275px]">
          <Image src={spotifyLogo.src} alt="Spotify logo" fill />
        </div>
      </div>
    </ContentContainer>
  );
};
