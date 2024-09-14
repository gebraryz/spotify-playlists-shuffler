'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { Input } from './input';

const debounce = <Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number,
): ((...args: Params) => void) => {
  let timer: NodeJS.Timeout;

  return (...args: Params) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

export const ShufflerPlaylistsToShuffleSearch: FC<{
  randomPlaylistName: string | undefined;
}> = ({ randomPlaylistName }) => {
  const router = useRouter();
  const t = useTranslations();

  return (
    <Input
      placeholder={randomPlaylistName ?? t('playlist.name_placeholder')}
      onChange={debounce((event) => {
        router.push(`?search=${event.target.value}`);
      }, 100)}
    />
  );
};
