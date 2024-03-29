'use client';

import React, {useState} from 'react';
import {signOut} from 'next-auth/react';
import {useConnect} from '@/app/hooks/useConnect';
import {
  ConnectComponentsProvider,
  ConnectAccountManagement,
  ConnectPaymentMethodSettings,
} from '@stripe/react-connect-js';
import {Button} from '@/components/ui/button';
import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';
import SubNav from '@/app/components/SubNav';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

const renderSettings = () => {
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
};

const renderPaymentMethods = () => {
  return (
    <div className="bg-white p-8 rounded-lg mb-6">
      <header className="mb-8">
        <h1 className="text-xl font-semibold">Payment methods</h1>
        <h2 className="text-sm">Add and manage your payment methods here.</h2>
      </header>
      <EmbeddedComponentContainer>
        <ConnectPaymentMethodSettings />
      </EmbeddedComponentContainer>
    </div>
  );
};

const renderApps = () => {
  return (
    <div className="bg-white p-8 rounded-lg mb-6">
      <header className="mb-8">
        <h1 className="text-xl font-semibold">Apps</h1>
        <h2 className="text-sm">
          Connect your Stripe account to third-party apps and services.
        </h2>
      </header>
      <div>Apps</div>
    </div>
  );
};

export default function Settings() {
  const [subpage, setSubpage] = useState('settings');

  const {hasError, stripeConnectInstance} = useConnect();

  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <AuthenticatedAndOnboardedRoute>
      <header className="flex flex-row justify-between">
        <div className="flex flex-row">
          <Avatar className="w-10 h-10 mr-5">
            <AvatarImage src="/avatar.png" alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>{' '}
          <h1 className="text-3xl font-bold">My studio</h1>
        </div>
        <div className="flex flex-row justify-between">
          <SubNav
            items={[
              {key: 'settings', label: 'Settings'},
              {key: 'paymentMethods', label: 'Payment methods'},
              {key: 'apps', label: 'Apps'},
            ]}
            page={subpage}
            setPage={setSubpage}
          />
          <div>
            <Button
              className="self-end"
              variant="ghost"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        {subpage === 'settings' && renderSettings()}
        {subpage === 'paymentMethods' && renderPaymentMethods()}
        {subpage === 'apps' && renderApps()}
      </ConnectComponentsProvider>
    </AuthenticatedAndOnboardedRoute>
  );
}
