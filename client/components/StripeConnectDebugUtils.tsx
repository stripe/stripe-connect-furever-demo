import React from 'react';
import {useSearchParams} from 'react-router-dom';
import { ConnectDebugUtils } from './internal/ConnectJsPrivateComponents';

const StripeConnectDebugUtils = () => {
  const [searchParams] = useSearchParams();
  if (searchParams.get('dev') !== 'true') {
    return null;
  }
  return <ConnectDebugUtils />;
};

export default StripeConnectDebugUtils;
