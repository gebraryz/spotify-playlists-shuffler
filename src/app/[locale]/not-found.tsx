import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ContentContainer } from '@/components/content-container';

const NotFoundPage: FC = () => {
  const t = useTranslations();

  return (
    <ContentContainer className="space-y-3">
      <h1 className="text-5xl font-bold">{t('not_found.message')}</h1>
      <p>
        {t('not_found.explanation')}
        Nie udało się znaleźć strony, której szukasz. Być może
        wprowadziłeś błędny adres URL lub strona została usunięta.
      </p>
    </ContentContainer>
  );
};

export default NotFoundPage;
