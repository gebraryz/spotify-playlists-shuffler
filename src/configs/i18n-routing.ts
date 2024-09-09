import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const i18nRouting = defineRouting({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(i18nRouting);