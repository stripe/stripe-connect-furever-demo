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
          <div className="flex h-full min-h-screen bg-paw-pattern bg-[size:426px]">
            <Nav />
            <div className="ml-64 flex flex-1 justify-center p-8">
              <div className="min-w-[600px] max-w-[1200px] flex-1 space-y-5">
                {children}
              </div>
            </div>
          </div>
        </DataRequest>
      </EmbeddedComponentWrapper>
    </AuthenticatedAndOnboardedRoute>
  );
}
