'use client';

import {ConnectPayouts} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {Button} from '@/components/ui/button';
import {LoaderCircle, Plus} from 'lucide-react';
import {useSession} from 'next-auth/react';
import React from 'react';

export default function Payouts() {
  const {data: session} = useSession();
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(!session?.user.setup);
  }, [session?.user.setup]);

  const onClick = async () => {
    setButtonLoading(true);
    try {
      const res = await fetch('/api/setup_accounts/create_payouts', {
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
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Payouts</h1>
        {!loading && (
          <Button onClick={onClick} disabled={buttonLoading}>
            {buttonLoading ? (
              <>
                <LoaderCircle className="mr-1 animate-spin" size={20} />{' '}
                Creating payouts
              </>
            ) : (
              <>
                <Plus size={20} className="mr-1" /> Create test payouts
              </>
            )}
          </Button>
        )}
      </div>
      <Container>
        <h1 className="text-xl font-bold">Recent payouts</h1>
        <EmbeddedComponentContainer>
          {loading ? (
            <div className="text-l flex items-center gap-1 justify-center py-16 text-center font-medium">
              <LoaderCircle
                className="mr-1 animate-spin items-center"
                size={20}
              />{' '}
              Creating test data
            </div>
          ) : (
            <ConnectPayouts />
          )}
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
