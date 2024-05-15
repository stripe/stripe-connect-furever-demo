import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';
import Nav from '@/app/components/Nav';
import {EmbeddedComponentWrapper} from '@/app/hooks/EmbeddedComponentWrapper';
import OnboardingDialog from '../components/OnboardingDialog';
import DataRequest from '../components/DataRequest';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticatedAndOnboardedRoute>
      <EmbeddedComponentWrapper>
        <DataRequest>
          <div className="flex h-full min-h-screen flex-col bg-paw-pattern bg-[size:426px] sm:flex-row">
            <Nav />
            <div className="mt-[74px] flex flex-1 justify-center p-3 pb-20 sm:ml-52 sm:mt-0 sm:p-8 lg:ml-64">
              <div className="w-full max-w-[1200px] flex flex-col flex-1 gap-y-4 md:gap-y-5">
                <OnboardingDialog />
                {children}
              </div>
            </div>
          </div>
        </DataRequest>
      </EmbeddedComponentWrapper>
    </AuthenticatedAndOnboardedRoute>
  );
}
