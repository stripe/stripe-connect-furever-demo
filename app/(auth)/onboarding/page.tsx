'use client';

import {ConnectAccountOnboarding} from '@stripe/react-connect-js';
import React from 'react';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Onboarding() {
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
