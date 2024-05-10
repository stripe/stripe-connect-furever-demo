'use client';
import Schedule from '@/app/components/Schedule';
import BalanceWidget from '@/app/components/BalanceWidget';
import RecentPaymentsWidget from '@/app/components/RecentPaymentsWidget';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';
import NotificationBannerContainer from '@/app/components/NotificationBannerContainer';
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

  return (
    <>
      <h1 className="text-3xl font-bold">Woof woof, {name}!</h1>
      <NotificationBannerContainer>
        <EmbeddedComponentContainer>
          <ConnectNotificationBanner />
        </EmbeddedComponentContainer>
      </NotificationBannerContainer>
      <div className="flex flex-row items-start space-x-5">
        <div className="min-w-[700px] flex-1">
          <Schedule />
        </div>
        <div className="w-[30%] min-w-[300px] space-y-4">
          <BalanceWidget />
          <RecentPaymentsWidget />
          <h2 className="pt-4 text-lg font-bold">Performance</h2>
          <MonthToDateWidget />
          <CustomersWidget />
        </div>
      </div>
    </>
  );
}
