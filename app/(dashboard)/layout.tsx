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
          <div className="bg-offset p-8 ml-64 flex-1 space-y-8">{children}</div>
        </div>
      </EmbeddedComponentWrapper>
    </AuthenticatedAndOnboardedRoute>
  );
}
