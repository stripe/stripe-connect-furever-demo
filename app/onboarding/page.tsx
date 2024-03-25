'use client';

import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {useConnect} from '../hooks/useConnect';
import {
  ConnectComponentsProvider,
  ConnectAccountOnboarding,
} from '@stripe/react-connect-js';

export default function Onboarding() {
  const router = useRouter();
  const {data: session} = useSession();
  const {hasError, stripeConnectInstance} = useConnect();

  if (!session || !session.user) {
    return null;
  }

  if (hasError || !stripeConnectInstance) {
    return null;
  }

  if (session?.user?.stripeAccount?.details_submitted) {
    router.push('/');
  }

  return (
    <>
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        <ConnectAccountOnboarding
          onExit={() => {
            router.push('/');
          }}
        />
      </ConnectComponentsProvider>
    </>
  );
}
