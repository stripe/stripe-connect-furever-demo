'use client';
import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';

import {ToolsPanelProvider} from '@/app/hooks/ToolsPanelProvider';
import DataRequest from '../components/DataRequest';
import Screen from '../components/Screen';
import * as React from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticatedAndOnboardedRoute>
      <ToolsPanelProvider>
        <DataRequest>
          <Screen>{children}</Screen>
        </DataRequest>
      </ToolsPanelProvider>
    </AuthenticatedAndOnboardedRoute>
  );
}
