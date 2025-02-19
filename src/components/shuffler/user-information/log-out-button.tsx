'use client';

import { IconLogout2 } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';

import { Button } from '../../ui/button';

export const ShufflerUserInformationLogOutButton: FC = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      icon={IconLogout2}
      loading={{ state: isLoading }}
      onClick={async () => {
        setIsLoading(true);

        await signOut();
      }}
    >
      {t('auth.log_out')}
    </Button>
  );
};
