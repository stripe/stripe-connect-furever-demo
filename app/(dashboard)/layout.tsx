'use client';
import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';

import Nav from '@/app/components/Nav';
import Container from '@/app/components/Container';
import {
  useToolsContext,
  ToolsPanelProvider,
} from '@/app/hooks/ToolsPanelProvider';
import {EmbeddedComponentWrapper} from '@/app/hooks/EmbeddedComponentWrapper';
import OnboardingDialog from '../components/OnboardingDialog';
import DataRequest from '../components/DataRequest';
import Screen from '../components/Screen';
import * as React from 'react';
import {useSettings} from '../hooks/useSettings';
import {QueryClientProvider, QueryClient} from 'react-query';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticatedAndOnboardedRoute>
        <EmbeddedComponentWrapper>
          <ToolsPanelProvider>
            <DataRequest>
              <Screen>{children}</Screen>
            </DataRequest>
          </ToolsPanelProvider>
        </EmbeddedComponentWrapper>
      </AuthenticatedAndOnboardedRoute>
    </QueryClientProvider>
  );
}
