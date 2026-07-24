import SubNav from '@/app/components/SubNav';

export default function ReportsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex flex-col justify-between md:flex-row">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="mt-4 md:mt-0">
          <SubNav
            base="/reports"
            routes={[
              {path: '/reports', label: 'Balance report'},
              {
                path: '/reports/reconciliation',
                label: 'Payout reconciliation',
              },
            ]}
          />
        </div>
      </header>
      {children}
    </>
  );
}
