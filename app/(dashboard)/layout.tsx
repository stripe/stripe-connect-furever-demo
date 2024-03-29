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
          <Nav />
          <div className="flex justify-center bg-offset p-8 ml-64 flex-1">
            <div className="max-w-[1200px] min-w-[600px] space-y-5 flex-1">{children}</div>
          </div>
        </div>
      </EmbeddedComponentWrapper>
    </AuthenticatedAndOnboardedRoute>
  );
}
