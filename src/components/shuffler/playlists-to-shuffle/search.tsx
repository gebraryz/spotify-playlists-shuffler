'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

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
  className?: string;
}> = ({ randomPlaylistName, className }) => {
  const router = useRouter();
  const t = useTranslations();

  return (
    <input
      type="text"
      placeholder={randomPlaylistName ?? t('playlist.name_placeholder')}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onChange={debounce((event) => {
        router.push(`?search=${event.target.value}`);
      }, 100)}
    />
  );
};
