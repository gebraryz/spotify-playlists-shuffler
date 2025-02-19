import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { i18nRouting } from './i18n-routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!i18nRouting.locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../translations/${locale}.json`)).default,
  };
});
