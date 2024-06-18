'use client';

import * as React from 'react';
import {ConnectPayments} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';
import {Button} from '@/components/ui/button';
import {LoaderCircle, Plus} from 'lucide-react';
import {useSession} from 'next-auth/react';
import CreatePaymentsButton from '@/app/components/testdata/CreatePaymentsButton';

export default function Payments() {
  const {data: session} = useSession();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(!session?.user.setup);
  }, [session?.user.setup]);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Payments</h1>
      </div>
      <div className="flex flex-col gap-3 md:gap-5 lg:flex-row">
        <div className="flex-1">
          <MonthToDateWidget />
        </div>
        <div className="flex-1">
          <CustomersWidget />
        </div>
      </div>
      <Container>
        <h1 className="text-xl font-bold">Recent payments</h1>
        <EmbeddedComponentContainer componentName="Payments">
          {loading ? (
            <div className="text-l flex items-center justify-center gap-1 py-16 text-center font-medium">
              <LoaderCircle
                className="mr-1 animate-spin items-center"
                size={20}
              />
              Creating test data
            </div>
          ) : (
            <ConnectPayments />
          )}
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
