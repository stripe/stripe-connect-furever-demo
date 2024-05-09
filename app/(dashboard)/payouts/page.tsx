'use client';

import {ConnectPayouts} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
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
    try{
    const res = await fetch('/api/setup_accounts/create_payouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (res.ok)
    {
      setButtonLoading(false)
      window.location.reload();
    }
  } catch(e)
  {
    console.log("Error with creating test data: ", e);
  }
  }
  return (
    <>
      <h1 className="text-3xl font-bold">Payouts</h1>
      <Container>
      <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold">Recent payouts</h1>
              <Button  onClick={onClick} disabled={buttonLoading}>
            {buttonLoading ? (
              <>
                <LoaderCircle className="animate-spin mr-1" size={20} /> Creating payouts 
              </>
            ) : (
              <>
              <Plus size={20} className='mr-1'/> Create test payouts</>
            )}
          </Button>  
          </div>    
        <EmbeddedComponentContainer>
        {
          loading ? (
            <div className='flex items-center justify-center text-center font-bold text-l py-16 text-subdued'>
            <LoaderCircle className="animate-spin items-center mr-1" size={20} /> Creating test data 
            </div>
          ) : 
          <ConnectPayouts />
}
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
