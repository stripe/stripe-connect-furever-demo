'use client';

import {ConnectAccountOnboarding} from '@stripe/react-connect-js';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import React from 'react';
import {useSession} from 'next-auth/react';

export default function Onboarding() {
  const {data: session} = useSession();
  const stripeAccount = session?.user.stripeAccount;

  return (
    <EmbeddedComponentContainer componentName="AccountOnboarding">
      <ConnectAccountOnboarding
        onExit={() => {
          window.location.href = '/home?shownux=true';
        }}
      />
    </EmbeddedComponentContainer>
  );
}
