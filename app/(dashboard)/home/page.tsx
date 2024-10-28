'use client';
import React from 'react';
import Schedule from '@/app/components/Schedule';
import BalanceWidget from '@/app/components/BalanceWidget';
import RecentPaymentsWidget from '@/app/components/RecentPaymentsWidget';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import Container from '@/app/components/Container';

export default function Dashboard() {
  const {data: session} = useSession();
  if (!session) {
    redirect('/');
  }

  const name = session.user.stripeAccount.individual?.first_name;

  return (
    <>
      <h1 className="text-3xl font-bold">Woof woof, {name || 'human'}!</h1>
      <p>TODO: The banner would go here!</p>

      <div className="flex flex-col items-start gap-2 md:gap-5 xl:flex-row">
        <Container className="flex w-full flex-1 flex-col p-5">
          <Schedule />
        </Container>
        <div className="-order-1 flex w-full flex-col gap-2 md:gap-4 xl:order-2 xl:w-[30%]">
          <div className="flex flex-grow flex-col gap-2 md:gap-4 md:max-xl:flex-row">
            <BalanceWidget />
            <RecentPaymentsWidget />
          </div>
          <h2 className="hidden pt-4 text-lg font-bold xl:block">
            Performance
          </h2>
          <div className="flex flex-grow flex-col gap-2 md:gap-4 md:max-xl:flex-row">
            <MonthToDateWidget />
            <CustomersWidget />
          </div>
        </div>
      </div>
    </>
  );
}
