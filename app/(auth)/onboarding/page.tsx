'use client';

import {ConnectAccountOnboarding} from '@stripe/react-connect-js';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import React from 'react';
import {useSession} from 'next-auth/react';
import {type NextRequest} from 'next/server';

export default function Onboarding() {
  const {data: session, status} = useSession();
  const stripeAccount = session?.user.stripeAccount;

  const isCustom =
<<<<<<< HEAD
    stripeAccount?.controller?.stripe_dashboard?.type === 'none' &&
    stripeAccount?.controller?.losses?.payments === 'application' &&
    stripeAccount?.controller?.requirement_collection === 'application';
=======
    stripeAccount &&
    stripeAccount.controller?.stripe_dashboard?.type === 'none' &&
    stripeAccount.controller?.losses?.payments === 'application' &&
    stripeAccount.controller?.requirement_collection === 'application';
>>>>>>> 6ec52a6 (frontend)

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
