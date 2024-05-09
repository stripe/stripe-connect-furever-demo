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

export default function Payments() {
  const {data: session} = useSession();
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(!session?.user.setup);
  }, [session?.user.setup]);

  const onClick = async () => {
    setButtonLoading(true);
    try {
      const res = await fetch('/api/setup_accounts/create_charges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setButtonLoading(false);
        window.location.reload();
      }
    } catch (e) {
      console.log('Error with creating test data: ', e);
    }
  };

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
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold">Recent payments</h1>
          {!loading && (
            <Button onClick={onClick} disabled={buttonLoading}>
              {buttonLoading ? (
                <>
                  <LoaderCircle className="mr-1 animate-spin" size={20} />{' '}
                  Creating payments
                </>
              ) : (
                <>
                  <Plus size={20} className="mr-1" /> Create test payments
                </>
              )}
            </Button>
          )}
        </div>
        <EmbeddedComponentContainer>
          {loading ? (
            <div className="text-l flex items-center justify-center py-16 text-center font-bold text-subdued">
              <LoaderCircle
                className="mr-1 animate-spin items-center"
                size={20}
              />{' '}
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
