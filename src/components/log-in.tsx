'use client';

import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';

import { useToast } from '@/hooks/use-toast';

import { ContentContainer } from './content-container';
import { Button } from './ui/button';

export const LogIn: FC = () => {
  const t = useTranslations();
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <ContentContainer className="space-y-6">
      <h1 className="text-3xl font-bold">Zaloguj się przez Spotify</h1>
      <Button
        loading={isRedirecting}
        onClick={async () => {
          try {
            await signIn('spotify');

            setIsRedirecting(true);
          } catch {
            toast({
              title: t('error_while_logging_in'),
            });
          }
        }}
      >
        Zaloguj się
      </Button>
    </ContentContainer>
  );
};
