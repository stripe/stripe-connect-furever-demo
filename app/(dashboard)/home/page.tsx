'use client';
import React from 'react';
import {useState} from 'react';
import Schedule from '@/app/components/Schedule';
import BalanceWidget from '@/app/components/BalanceWidget';
import RecentPaymentsWidget from '@/app/components/RecentPaymentsWidget';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {ConnectNotificationBanner} from '@stripe/react-connect-js';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import Container from '@/app/components/Container';

export default function Dashboard() {
  const {data: session} = useSession();
  if (!session) {
    redirect('/');
  }

  const [margins, setMargins] = useState('flex w-full flex-1 flex-col p-5');

  const name = session.user.stripeAccount.individual?.first_name;

  const BREAKPOINT = 1190;

  // set callback

  const renderConditionallyCallback = (response: any) => {
    // const total = 0;

    console.log('callback works');
    console.log(response);
    // console.log(total, actionRequired);

    // let notificationBannerMargins = 'invisible flex w-full flex-1 flex-col p-5';
    // if (total && total > 0) {
    //   setMargins('invisible flex w-full flex-1 flex-col p-5');
    // }
    // How to reset?
  };

  // useState for margins

  // const {total, notificationBannerMargins} = renderConditionally();

  const notificationBanner = (
    <ConnectNotificationBanner
      onNotificationsChange={renderConditionallyCallback}
    />
  );
  // notificationBanner.onNotificationsChange(renderConditionally);

  return (
    <>
      <h1 className="text-3xl font-bold">Woof woof, {name || 'human'}!</h1>
      {/* \\ embeded component container */}

      {/* {total > 0 && ( */}
      {
        <Container className={'notificationBannerMargins'}>
          <EmbeddedComponentContainer
            componentName="NotificationBanner"
            className="-m-2 mb-0.5"
          >
            {/* <ConnectNotificationBanner /> */}
            {notificationBanner}
          </EmbeddedComponentContainer>
        </Container>
      }

      {/* end */}

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
