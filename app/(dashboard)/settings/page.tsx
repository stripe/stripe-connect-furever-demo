'use client';

import {ConnectNotificationBanner, ConnectPaymentMethodSettings} from '@stripe/react-connect-js';
import {ConnectAccountManagement} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {useSession} from 'next-auth/react';

export default function Settings() {
  const {data: session} = useSession();
  const email = session?.user.email;
  const businessName = session?.user.businessName;
  return (
    <>
      <Container>
        <h1 className="mb-4 text-xl font-semibold">Basic details</h1>
        <div className="flex flex-row space-x-20">
          <div>
            <div className="text-subdued">Business name</div>
            <div className="font-medium">{businessName}</div>
          </div>
          <div>
            <div className="text-subdued">Email</div>
            <div className="font-medium">{email}</div>
          </div>
        </div>
      </Container>
      <Container>
        <header className="mb-5">
          <h1 className="text-xl font-semibold">Account settings</h1>
          <h2 className="text-subdued">
            Manage account and business settings.
          </h2>
        </header>
        <EmbeddedComponentContainer>
          <ConnectAccountManagement />
        </EmbeddedComponentContainer>
      </Container>

      <Container>
        <header className="mb-5">
          <h1 className="text-xl font-semibold">Payment methods</h1>
          <h2 className="text-subdued">Add and manage your payment methods.</h2>
        </header>
        <EmbeddedComponentContainer>
          <ConnectPaymentMethodSettings />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
