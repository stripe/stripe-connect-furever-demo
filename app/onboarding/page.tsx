'use client';

import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {useEffect} from 'react';
import {useConnect} from '../hooks/useConnect';
import {
  ConnectComponentsProvider,
  ConnectAccountOnboarding,
} from '@stripe/react-connect-js';

export default function Onboarding() {
  const router = useRouter();
  const {data: session, update} = useSession();
  const {hasError, stripeConnectInstance} = useConnect();

  useEffect(() => {
    if (session?.user?.stripeAccount?.details_submitted === false) {
      router.push('/onboarding');
    }
  });

  if (!session || !session.user) {
    return null;
  }

  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <>
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        <ConnectAccountOnboarding
          onExit={async () => {
            await update();
            router.push('/');
          }}
        />
      </ConnectComponentsProvider>
    </>
  );
}
