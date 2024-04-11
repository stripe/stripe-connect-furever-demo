import SubNav from '@/app/components/SubNav';

export default function FinancesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Finances</h1>
        <SubNav
          base="/finances"
          routes={[
            {path: '/finances', label: 'Overview'},
            {path: '/finances/cards', label: 'Cards'},
          ]}
        />
      </header>
      {children}
    </>
  );
}
