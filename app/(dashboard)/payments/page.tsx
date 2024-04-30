'use client';

import {ConnectPayments} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';

export default function Payouts() {
  return (
    <>
      <h1 className="text-3xl font-bold">Payments</h1>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex-1">
          <MonthToDateWidget />
        </div>
        <div className="flex-1">
          <CustomersWidget />
        </div>
      </div>
      <Container>
        <h1 className="text-xl font-bold">Recent payments</h1>
        <EmbeddedComponentContainer>
          <ConnectPayments />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
