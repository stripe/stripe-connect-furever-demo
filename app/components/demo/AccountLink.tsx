'use client';

import {useAccountLinkCreate} from '@/app/hooks/useAccountLinkCreate';
import React from 'react';

export const AccountLink = () => {
  const {isLoading, error, data} = useAccountLinkCreate();

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const {url} = data;
  return <a href={url}>Click to onboard</a>;
};
