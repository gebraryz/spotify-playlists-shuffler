import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ContentContainer } from './content-container';

export const Footer: FC = () => {
  const t = useTranslations();

  return (
    <ContentContainer as="footer">
      <p>
        &copy;
        {' '}
        {new Date().getFullYear()}
        .
        {' '}
        {t('footer.all_rights_reserved')}
        .
      </p>
    </ContentContainer>
  );
};
