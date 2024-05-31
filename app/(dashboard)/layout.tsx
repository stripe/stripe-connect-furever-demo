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

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {open, handleOpenChange} = useToolsContext();
  console.log(open);
  return (
    <AuthenticatedAndOnboardedRoute>
      <EmbeddedComponentWrapper>
        <DataRequest>
          <div className="flex grow flex-row ">
            <div className="h-[823-px] w-[318px] border bg-white ">
              <ToolsPanelProvider />
            </div>
            <div className="bg-dot-grid h-full w-auto grow">
              <div
                className={`flex ${open ? 'h-screen w-[full] scale-[.80] flex-col overflow-auto rounded-xl border-2 bg-paw-pattern shadow-xl' : 'h-full min-h-screen w-full flex-col bg-paw-pattern sm:flex-row'}`}
              >
                <Nav />
                <div className="mt-[74px] flex flex-1 justify-center p-3 pb-20 sm:ml-52 sm:mt-0 sm:p-8 lg:ml-64">
                  <div className="flex h-[442px]  grow flex-col gap-y-4 md:gap-y-5">
                    <OnboardingDialog />
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DataRequest>
      </EmbeddedComponentWrapper>
    </AuthenticatedAndOnboardedRoute>
  );
}
