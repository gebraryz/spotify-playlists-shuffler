import '../../styles/global.css';

import { IBM_Plex_Sans } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import { ClientSidePackagesProviders } from '@/components/client-side-packages-providers';
import { TopBar } from '@/components/top-bar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/cn';

const font = IBM_Plex_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
});

const Layout: FC<PropsWithChildren<{ params: { locale: string } }>> = async ({
  params: { locale },
  children,
}) => {
  const translations = (await getMessages()) as IntlMessages;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen font-sans antialiased text-foreground bg-primary-foreground',
          font.variable,
        )}
      >
        <ClientSidePackagesProviders
          translations={translations}
          locale={locale}
        >
          <TopBar />
          {children}
        </ClientSidePackagesProviders>
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;
