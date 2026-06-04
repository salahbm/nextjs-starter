import { PropsWithChildren } from 'react';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

import AlertProvider from './alert';
import Internationalization from './intl';
import IntlErrorHandlingProvider from './intl-error';
import QueryProvider from './query';
import ThemeProvider from './theme';
import ZodInitProvider from './zod';

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <Internationalization>
        <IntlErrorHandlingProvider>
          <QueryProvider>
            <AlertProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </AlertProvider>
          </QueryProvider>
          <ZodInitProvider />
        </IntlErrorHandlingProvider>
      </Internationalization>
    </ThemeProvider>
  );
}
