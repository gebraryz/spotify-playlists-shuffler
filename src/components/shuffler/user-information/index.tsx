import type { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ContentContainer } from '../../content-container';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { ShufflerUserInformationLogOutButton } from './log-out-button';

export const ShufflerUserInformation: FC<{ data: Session['user'] }> = ({ data }) => {
  const t = useTranslations();

  if (!data) {
    throw new Error('User is required');
  }

  return (
    <ContentContainer className="flex items-center gap-x-6">
      <Avatar className="size-[60px] desktop:size-[80px]">
        {data.image ? <AvatarImage src={data.image} /> : null}
        <AvatarFallback>{data.name ? data.name.charAt(0) : 'U'}</AvatarFallback>
      </Avatar>
      <div className="space-y-3">
        <h2 className="text-3xl desktop:text-4xl">
          {t('hi')}
          ,
          {' '}
          <b>{data.name}</b>
          !
        </h2>
        <ShufflerUserInformationLogOutButton />
      </div>
    </ContentContainer>
  );
};
