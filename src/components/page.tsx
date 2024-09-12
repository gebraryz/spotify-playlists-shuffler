import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

export const Page: FC<PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={cn('mx-auto max-w-3xl py-8 desktop:px-8 px-4', className)}>
    {children}
  </div>
);
