import AuthenticatedRoute from '@/app/components/AuthenticatedRoute';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthenticatedRoute>{children}</AuthenticatedRoute>;
}
