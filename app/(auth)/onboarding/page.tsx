'use client';

import {ConnectAccountOnboarding} from '@stripe/react-connect-js';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import React from 'react';

export default function Onboarding() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    React.useState(false);

  if (hasCompletedOnboarding) {
    return <div>Onboarding finished! Redirecting to dashboard...</div>;
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
