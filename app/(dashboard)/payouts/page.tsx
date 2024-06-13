'use client';

import {ConnectPayouts} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {Button} from '@/components/ui/button';
import {LoaderCircle, Plus} from 'lucide-react';
import {useSession} from 'next-auth/react';
import React from 'react';
import CreatePayoutsButton from '@/app/components/testdata/CreatePayoutsButton';

export default function Payouts() {
  const {data: session} = useSession();
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(!session?.user.setup);
  }, [session?.user.setup]);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Payouts</h1>
        <CreatePayoutsButton classes="bg-accent text-accent-foreground hover:bg-[#24A55B]" />
      </div>
      <Container>
        <h1 className="ml-1 text-xl font-bold">Recent payouts</h1>
        <EmbeddedComponentContainer>
          {loading ? (
            <div className="text-l flex items-center justify-center gap-1 py-16 text-center font-medium">
              <LoaderCircle
                className="mr-1 animate-spin items-center"
                size={20}
              />
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
