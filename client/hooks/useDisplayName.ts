import React from 'react';
import {User, useSession} from './SessionProvider';

export const useDisplayName = () => {
  const {user, stripeAccount} = useSession();
  if (!user || !stripeAccount) return '';

  if (user.type === 'company') {
    return user.salon.name;
  } else {
    return `${user.firstName} ${user.lastName}`;
  }
};

export const useDisplayShortName = () => {
  const {user, stripeAccount} = useSession();
  if (!user || !stripeAccount) return 'P';

  if (user.type === 'company') {
    return user.salon.name.charAt(0);
  } else {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
};
