import type { ElementType, FC, PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

export const ContentContainer: FC<
  PropsWithChildren<{ className?: string; title?: string; as?: ElementType }>
> = ({ className, title, as: Component = 'div', children }) => (
  <Component
    className={cn(
      'rounded-md border border-border bg-background p-4 shadow-md',
      title ? 'relative' : null,
      className,
    )}
  >
    {children}
    {title
      ? (
          <p
            className={cn(
              'absolute top-[-15px] mx-auto w-fit rounded-md bg-green-600 px-3 py-1 text-sm text-primary-foreground shadow-md dark:text-secondary-foreground left-1/2 transform -translate-x-1/2',
            )}
          >
            {title}
          </p>
        )
      : null}
  </Component>
);
