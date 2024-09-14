import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ContentContainer } from '../content-container';
import { StatisticsCounter } from './counter';

export const Statististics: FC<{
  shuffles: number;
  shufflesInLast24Hours: number;
}> = ({ shuffles, shufflesInLast24Hours }) => {
  const t = useTranslations();

  const values = [
    { label: t('statistics.total'), value: shuffles },
    { label: t('statistics.last_24_hours'), value: shufflesInLast24Hours },
  ];

  return (
    <ContentContainer>
      {values.map(({ label, value }) => (
        <p className="text-xl" key={label}>
          {label}
          :
          {' '}
          <b>
            <StatisticsCounter value={value} />
          </b>
        </p>
      ))}
    </ContentContainer>
  );
};
