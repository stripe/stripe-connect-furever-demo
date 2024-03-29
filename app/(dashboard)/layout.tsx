import Nav from '@/app/components/Nav';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full min-h-screen">
      <Nav />
      <div className="bg-offset p-8 ml-64 flex-1 space-y-8">{children}</div>
    </div>
  );
}
