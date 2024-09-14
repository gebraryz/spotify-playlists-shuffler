import type { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { IconImage } from '@/components/icon-image';

import { ContentContainer } from '../../content-container';
import { ShufflerUserInformationLogOutButton } from './log-out-button';

export const ShufflerUserInformation: FC<{ data: Session['user'] }> = ({
  data,
}) => {
  const t = useTranslations();

  if (!data) {
    throw new Error('User is required');
  }

  return (
    <ContentContainer className="flex items-center gap-x-6">
      <IconImage
        image={{
          width: 80,
          height: 80,
          src: data.image,
          title: data.name ?? t('user.profile_image'),
        }}
      />
      <div className="space-y-3">
        <h2 className="text-3xl desktop:text-4xl">
          {t('auth.hi')}
          ,
          {'  '}
          <b>{data.name}</b>
          !
        </h2>
        <ShufflerUserInformationLogOutButton />
      </div>
    </ContentContainer>
  );
};
