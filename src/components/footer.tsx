import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ContentContainer } from './content-container';

export const Footer: FC = () => {
  const t = useTranslations();

  return (
    <ContentContainer as="footer">
      <p className="text-xl">
        &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        <Link
          href="https://www.gebraryz.me"
          title="Bartłomiej Olejnik"
          className="font-bold text-spotify transition-colors hover:text-spotify-hover"
          target="u_blank"
          rel="noopener noreferrer"
        >
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
