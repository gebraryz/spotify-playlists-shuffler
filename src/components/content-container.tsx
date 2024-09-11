import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

export const ContentContainer: FC<PropsWithChildren<{ className?: string }>> = ({ className, children }) => <div className={cn('rounded-md border border-border bg-background py-4 px-8 shadow-md', className)}>{children}</div>;
