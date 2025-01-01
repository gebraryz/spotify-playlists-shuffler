'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { type FC, useEffect, useState } from 'react';

import { request } from '@/configs/request';

import { ContentContainer } from '../content-container';
import { StatisticsCounter } from './counter';

type Data = {
  totalShufflesInLast24Hours: number;
  totalShuffles: number;
};

export const Statististics: FC = () => {
  const t = useTranslations();
  const [fetchCount, setFetchCount] = useState(0);
  const [firstFetchedData, setFirstFetchedData] = useState<Data>({
    totalShufflesInLast24Hours: 0,
    totalShuffles: 0,
  });
  const { data, isLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () =>
      request('route-handler').get('shuffles-count').json<Data>(),
  });

  useEffect(() => {
    if (data) {
      setFetchCount(fetchCount + 1);

      if (fetchCount === 1) {
        setFirstFetchedData(data);
      }
    }
  }, [data]);

  return (
    <ContentContainer>
      {data && !isLoading
        ? (
            [
              { label: t('statistics.total'), value: {
                final: data.totalShuffles,
                initial: firstFetchedData.totalShuffles,
              } },
              {
                label: t('statistics.last_24_hours'),
                value: {
                  final: data.totalShufflesInLast24Hours,
                  initial: firstFetchedData.totalShufflesInLast24Hours,
                },
              },
            ].map(({ label, value }) => (
              <p className="text-xl" key={label}>
                {label}
                :
                {' '}
                <b>
                  <StatisticsCounter finalValue={value.final} startValue={value.initial} />
                </b>
              </p>
            ))
          )
        : (
            <div
              className="h-[60px] w-full animate-pulse rounded-md bg-primary/10"
            />
          )}
    </ContentContainer>
  );
};
