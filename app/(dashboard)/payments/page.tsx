'use client';

import * as React from 'react';
import {ConnectPayments} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';


export default function Payments() {

  const [loading, setLoading] = React.useState(false);

  const onClick = async () => {
    setLoading(true);
    await fetch('/api/setup_accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    window.location.reload();
  }

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
        <div className='flex flex-col space-y-3 items-start'>
        <h1 className="text-xl font-bold">Recent payments</h1>
        <Button onClick={onClick} disabled={loading}> 
        {loading ? (
        <>
          Creating payments <Loader2 className="animate-spin" size={20} />
        </>
      ) : (
        <>
          Create test payments
        </>
      )}
        
        </Button>
        </div>
        <EmbeddedComponentContainer>
          <ConnectPayments />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
