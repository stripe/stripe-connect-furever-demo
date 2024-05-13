import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';
import Nav from '@/app/components/Nav';
import {EmbeddedComponentWrapper} from '@/app/hooks/EmbeddedComponentWrapper';
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
          <div className="flex flex-col sm:flex-row h-full min-h-screen bg-paw-pattern bg-[size:426px]">
            <Nav />
            <div className="flex flex-1 justify-center p-3 mt-[74px] sm:mt-0 sm:p-8 sm:ml-52 lg:ml-64">
              <div className="max-w-[1200px] w-full flex-1 space-y-4 md:space-y-5">
                {children}
              </div>
            </div>
          </div>
        </DataRequest>
      </EmbeddedComponentWrapper>
    </AuthenticatedAndOnboardedRoute>
  );
}
