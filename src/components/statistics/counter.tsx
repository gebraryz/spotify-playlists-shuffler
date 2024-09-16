'use client';

import type { FC } from 'react';
import CountUp from 'react-countup';

export const StatisticsCounter: FC<{ value: number }> = ({ value }) => (
  <CountUp start={value / 2} end={value} duration={3} scrollSpyOnce />
);
