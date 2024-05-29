'use client';

import {ConnectAccountOnboarding} from '@stripe/react-connect-js';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import React from 'react';
import {useSession} from 'next-auth/react';

export default function Onboarding() {
  const {data: session, status} = useSession();
  const stripeAccount = session?.user.stripeAccount;

  const isCustom =
    stripeAccount.controller?.stripe_dashboard?.type === 'none' &&
    stripeAccount.controller?.losses?.payments === 'application' &&
    stripeAccount.controller?.requirement_collection === 'application';

  return (
    <EmbeddedComponentContainer>
      <ConnectAccountOnboarding
        onExit={() => {
          if (isCustom) {
            window.location.href = '/bankaccountform';
          } else {
            window.location.href = '/home?shownux=true';
          }
        }}
      />
    </EmbeddedComponentContainer>
  );
}
