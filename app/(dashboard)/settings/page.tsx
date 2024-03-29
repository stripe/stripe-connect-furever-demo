'use client';

import {ConnectAccountManagement} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Settings() {
  return (
    <>
      <Container>
        <h1 className="text-xl font-semibold">Basic details</h1>
        <div className="flex flex-row space-x-12">
          <div>
            <div className="text-subdued">Studio name</div>
            <div>Steve Yoga Studio</div>
          </div>
          <div>
            <div className="text-subdued">Email</div>
            <div>stevekaliski@stripe.com</div>
          </div>
          <div>
            <div className="text-subdued">Business name</div>
            <div>Greatest Yoga Studio</div>
          </div>
        </div>
      </Container>
      <Container>
        <header className="mb-8">
          <h1 className="text-xl font-semibold">Account settings</h1>
          <h2 className="text-sm">
            Pose partners with Stripe to help you accept payments and get paid
            out. Manage your Stripe settings here.
          </h2>
        </header>
        <EmbeddedComponentContainer>
          <ConnectAccountManagement />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
