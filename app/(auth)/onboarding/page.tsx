'use client';

import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {ConnectAccountOnboarding} from '@stripe/react-connect-js';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import React from 'react';

export default function Onboarding() {
  const {update} = useSession();
  const router = useRouter();

  return (
    <EmbeddedComponentContainer>
      <ConnectAccountOnboarding
        onExit={async () => {
          await update();
          router.push('/');
        }}
      />
    </EmbeddedComponentContainer>
  );
}
