'use client';

import {ConnectPaymentMethodSettings} from '@stripe/react-connect-js';
import {ConnectAccountManagement} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Settings() {
  return (
    <>
      <Container>
        <h1 className="mb-4 text-xl font-semibold">Basic details</h1>
        <div className="flex flex-row space-x-20">
          <div>
            <div className="text-subdued">Business name</div>
            <div className="font-medium">Best Dog Groomers</div>
          </div>
          <div>
            <div className="text-subdued">Email</div>
            <div className="font-medium">jenny@example.com</div>
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
