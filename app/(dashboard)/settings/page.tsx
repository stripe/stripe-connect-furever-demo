'use client';

import {ConnectAccountManagement} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Settings() {
  return (
    <>
      <Container>
        <h1 className="text-xl font-semibold mb-4">Basic details</h1>
        <div className="flex flex-row space-x-20">
          <div>
            <div className="text-subdued">Studio name</div>
            <div className="font-medium">Steve Yoga Studio</div>
          </div>
          <div>
            <div className="text-subdued">Email</div>
            <div className="font-medium">stevekaliski@stripe.com</div>
          </div>
          <div>
            <div className="text-subdued">Business name</div>
            <div className="font-medium">Greatest Yoga Studio</div>
          </div>
        </div>
      </Container>
      <Container>
        <header className="mb-8">
          <h1 className="text-xl font-semibold">Account settings</h1>
          <h2 className="text-subdued">
            Manage account and business settings.
          </h2>
        </header>
        <EmbeddedComponentContainer>
          <ConnectAccountManagement />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
