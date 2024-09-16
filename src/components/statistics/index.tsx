'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import type { FC, HTMLAttributes } from 'react';

import { request } from '@/configs/request';
import { cn } from '@/utils/cn';

import { ContentContainer } from '../content-container';
import { StatisticsCounter } from './counter';

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('animate-pulse rounded-md bg-primary/10', className)}
    {...props}
  />
);

export { Skeleton };

export const Statististics: FC = () => {
  const t = useTranslations();
  const { data, isLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () =>
      request('route-handler').get('shuffles-count').json<{
        totalShufflesInLast24Hours: number;
        totalShuffles: number;
      }>(),
  });

  return (
    <ContentContainer>
      {data && !isLoading
        ? (
            [
              { label: t('statistics.total'), value: data.totalShuffles },
              {
                label: t('statistics.last_24_hours'),
                value: data.totalShufflesInLast24Hours,
              },
            ].map(({ label, value }) => (
              <p className="text-xl" key={label}>
                {label}
                :
                {' '}
                <b>
                  <StatisticsCounter value={value} />
                </b>
              </p>
            ))
          )
        : (
            <Skeleton className="h-[60px] w-full" />
          )}
    </ContentContainer>
  );
};
