'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { type FC, type PropsWithChildren, useState } from 'react';

export const ClientSidePackagesProviders: FC<
  PropsWithChildren<{ translations: IntlMessages; locale: string }>
> = ({ translations, locale, children }) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <NextIntlClientProvider
      messages={translations}
      locale={locale}
      timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
    >
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools buttonPosition="bottom-left" />
          </QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
};
