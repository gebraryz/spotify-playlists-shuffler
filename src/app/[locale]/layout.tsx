import '../../styles/global.css';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import { ClientSidePackagesProviders } from '@/components/client-side-packages-providers';
import { TopBar } from '@/components/top-bar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/cn';

const font = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const generateMetadata = async (): Promise<Metadata> => {
  const t = (await getMessages()) as IntlMessages;

  const title = t.app.title;
  const description = t.app.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
};

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
        <Toaster richColors />
      </body>
    </html>
  );
};

export default Layout;
