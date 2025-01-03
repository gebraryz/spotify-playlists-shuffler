import { Slot, Slottable } from '@radix-ui/react-slot';
import type { TablerIcon } from '@tabler/icons-react';
import { IconLoader } from '@tabler/icons-react';
import { type VariantProps,cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { cn } from '../../utils/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        'default': 'h-9 px-4 py-2',
        'xl': 'h-12 px-6 py-3',
        '2xl': 'h-14 px-8 py-4',
        'sm': 'h-8 rounded-md px-3 text-xs',
        'lg': 'h-10 rounded-md px-8',
        'icon': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const Button = React.forwardRef<
  HTMLButtonElement,
  {
    asChild?: boolean;
    loading?: { state: boolean; text?: string };
    icon?: TablerIcon;
    classNames?: { button?: string; icon?: string };
  } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> &
  VariantProps<typeof buttonVariants>
>(
  (
    {
      classNames,
      variant,
      size,
      loading,
      disabled,
      icon: Icon,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const t = useTranslations();
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        className={cn(
          buttonVariants({ variant, size, className: classNames?.button }),
        )}
        disabled={loading?.state || disabled}
        ref={ref}
        {...props}
      >
        {loading?.state
          ? (
              <>
                <IconLoader className="mr-2 size-4 animate-spin" />
                {size !== 'icon' && (
                  <span>{loading.text || `${t('loading')}...`}</span>
                )}
              </>
            )
          : (
              <>
                {Icon && <Icon className={cn('mr-2', classNames?.icon)} />}
                {!loading?.state && <Slottable>{children}</Slottable>}
              </>
            )}
      </Component>
    );
  },
);

Button.displayName = 'Button';
