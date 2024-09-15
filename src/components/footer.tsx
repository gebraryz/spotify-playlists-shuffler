import Link from 'next/link';
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
        {' '}
        <Link href="https://www.gebraryz.me" title="Bartłomiej Olejnik" className="text-[#1a5fe3]">
          Bartłomiej Olejnik
        </Link>
        .
        {' '}
        {t('footer.all_rights_reserved')}
        .
      </p>
    </ContentContainer>
  );
};
