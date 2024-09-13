'use client';

import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils/cn';

import { Button, buttonVariants } from '../ui/button';

export const LogInButton: FC<{ className?: string }> = ({ className }) => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      classNames={{ button: buttonVariants({
        className: cn('text-xl font-bold uppercase', className),
        size: '2xl',
      }) }}
      loading={isLoading}
      onClick={async () => {
        try {
          setIsLoading(true);

          await signIn('spotify');
        } catch {
          toast.error(t('auth.error_while_logging_in'));
        }
      }}
    >
      {t('auth.log_in')}
    </Button>
  );
};
