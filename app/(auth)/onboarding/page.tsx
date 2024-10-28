'use client';

import React from 'react';
import {useSession} from 'next-auth/react';

export default function Onboarding() {
  const {data: session} = useSession();
  const stripeAccount = session?.user.stripeAccount;

  return <p>TODO: The onboarding UI goes here!</p>;
}
