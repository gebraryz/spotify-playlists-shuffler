import createMiddleware from 'next-intl/middleware';

import { i18nRouting } from './configs/i18n-routing';

export default createMiddleware(i18nRouting);

export const config = {
  matcher: ['/', '/(en|pl)/:path*'],
};
