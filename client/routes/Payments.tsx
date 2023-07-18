import React from 'react';
import Link from '@mui/material/Link';

export const Payments = () => {
  return (
    <Link href="https://dashboard.stripe.com/test/payments">
      To manage your payments, open the Stripe dashboard
    </Link>
  );
};
