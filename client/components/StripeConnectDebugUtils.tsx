import React from 'react';
import {useSearchParams} from 'react-router-dom';

const StripeConnectDebugUtils = () => {
  const [searchParams] = useSearchParams();
  if (searchParams.get('dev') !== 'true') {
    return null;
  }
  return <stripe-connect-debug-utils></stripe-connect-debug-utils>;
};

export default StripeConnectDebugUtils;
