'use client';

import {Inter as FontSans} from 'next/font/google';
import {cn} from '@/lib/utils';
import './globals.css';
import NextAuthProvider from './auth';
import DebugMenu from '@/app/components/debug/DebugMenu';
import {SettingsProvider} from '@/app/contexts/settings';
import {EmbeddedComponentBorderProvider} from '@/app/hooks/EmbeddedComponentBorderProvider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Furever</title>
      </head>
      <body
        className={cn(
          'min-h-screen bg-offset font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextAuthProvider>
          <SettingsProvider>
            <EmbeddedComponentBorderProvider>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </EmbeddedComponentBorderProvider>
            <DebugMenu />
          </SettingsProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
