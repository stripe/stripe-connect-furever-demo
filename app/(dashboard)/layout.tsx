import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';
import Nav from '@/app/components/Nav';
import {EmbeddedComponentWrapper} from '@/app/hooks/EmbeddedComponentWrapper';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticatedAndOnboardedRoute>
      <EmbeddedComponentWrapper>
        <div className="flex h-full min-h-screen">
          {/* Background image */}
          <div className="fixed left-0 top-0 -z-10 h-full w-full bg-paw-pattern bg-[size:426px] bg-repeat"></div>
          <Nav />
          <div className="ml-64 flex flex-1 justify-center p-8">
            <div className="min-w-[600px] max-w-[1200px] flex-1 space-y-5">
              {children}
            </div>
          </div>
        </div>
      </EmbeddedComponentWrapper>
    </AuthenticatedAndOnboardedRoute>
  );
}
