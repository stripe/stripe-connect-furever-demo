'use client';

import React from 'react';
import {useSession} from 'next-auth/react';
import {useCreateAccountLink} from '@/app/hooks/useCreateAccountLink';
import {Link} from '@/components/ui/link';

export default function Onboarding() {
  const {data: session} = useSession();
  const stripeAccount = session?.user.stripeAccount;

  const accountLink = useCreateAccountLink();

  if (accountLink.isLoading) {
    return <p>Loading...</p>;
  }

  if (accountLink.error) {
    return <p>Error: {accountLink.error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-y-[24px]">
      <div className="text-secondary">
        Go to the{' '}
        <Link href={accountLink.data?.url} className="font-medium text-accent">
          Onboarding UI for account {stripeAccount?.id}
        </Link>
      </div>
    </div>
  );
}
