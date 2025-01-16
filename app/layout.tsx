import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { AuthProvider } from '@/context/AuthContext';
import { theme } from '../theme';

export const metadata = {
  title: 'Movies Live',
  description: 'Watch movies online',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <AuthProvider>{children}</AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
