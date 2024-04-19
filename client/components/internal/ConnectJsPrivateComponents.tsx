import {ConnectElementTagName} from '@stripe/connect-js';
import {
  useAttachAttribute,
  useAttachEvent,
  useCreateComponent,
} from '@stripe/react-connect-js';
import React from 'react';

// Not yet shipped connect components. These are not publicly accessible.
export const ConnectDebugUtils = (): JSX.Element => {
  const {wrapper} = useCreateComponent(
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    'stripe-connect-debug-utils' as any
  );
  return wrapper;
};
