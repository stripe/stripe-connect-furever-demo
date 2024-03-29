'use client';

import {ConnectComponentsProvider} from '@stripe/react-connect-js';
import {EmbeddedComponentProvider} from '@/app/hooks/EmbeddedComponentProvider';
import {useConnect} from '@/app/hooks/useConnect';

export const EmbeddedComponentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {hasError, stripeConnectInstance} = useConnect();
  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <EmbeddedComponentProvider connectInstance={stripeConnectInstance}>
        {children}
      </EmbeddedComponentProvider>
    </ConnectComponentsProvider>
  );
};
