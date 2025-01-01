'use client';

import type { FC } from 'react';
import CountUp from 'react-countup';

export const StatisticsCounter: FC<{ finalValue: number; startValue: number }> = ({ finalValue, startValue }) => (
  <CountUp start={startValue} end={finalValue} duration={3} scrollSpyOnce />
);
