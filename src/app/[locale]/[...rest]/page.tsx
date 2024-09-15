import { notFound } from 'next/navigation';
import type { FC } from 'react';

const CatchAllPages: FC = () => {
  notFound();
};

export default CatchAllPages;
