'use client';
import Schedule from '@/app/components/Schedule';
import BalanceWidget from '@/app/components/BalanceWidget';
import RecentPaymentsWidget from '@/app/components/RecentPaymentsWidget';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {ConnectNotificationBanner} from '@stripe/react-connect-js';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';

export default function Dashboard() {
  const {data: session} = useSession();
  if (!session) {
    redirect('/');
  }

  const name = session.user.stripeAccount.individual?.first_name;

  const BREAKPOINT = 1190;

  return (
    <>
      <h1 className="text-3xl font-bold">Woof woof, {name}!</h1>
      <div className="bg-white">
        <EmbeddedComponentContainer>
          <ConnectNotificationBanner />
        </EmbeddedComponentContainer>
      </div>
      <div className="flex flex-col xl:flex-row items-start gap-2 md:gap-5">
        <div className="w-full flex-1">
          <Schedule />
        </div>
        <div className="flex flex-col w-full xl:w-[30%] -order-1 xl:order-2 gap-2 md:gap-4">
          <div className="flex flex-grow flex-col md:max-xl:flex-row gap-2 md:gap-4">
            <BalanceWidget />
            <RecentPaymentsWidget />
          </div>
          <h2 className="pt-4 text-lg font-bold hidden xl:block">Performance</h2>
          <div className="flex flex-grow flex-col md:max-xl:flex-row gap-2 md:gap-4">
            <MonthToDateWidget />
            <CustomersWidget />
          </div>
        </div>
      </div>
    </>
  );
}
