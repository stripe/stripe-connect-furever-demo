'use client';

import {ConnectAccountOnboarding} from '@stripe/react-connect-js';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import React from 'react';
import {LoaderCircle} from 'lucide-react';

export default function Onboarding() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    React.useState(false);

  if (hasCompletedOnboarding) {
    // If we render this, we are in the process of redirecting
    return (
      <div className="flex w-full items-center justify-center">
        <LoaderCircle className="mr-1 animate-spin" size={20} />
      </div>
    );
  }

  return (
    <EmbeddedComponentContainer componentName="AccountOnboarding">
      <ConnectAccountOnboarding
        onExit={() => {
          // Since redirecting takes some time, we set the state first to hide the onboarding component to avoid showing the default "success" screen
          setHasCompletedOnboarding(true);

          window.location.href = '/home?shownux=true';
        }}
      />
    </EmbeddedComponentContainer>
  );
}
