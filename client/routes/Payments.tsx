import React from 'react';
import {Typography, Link} from '@mui/material';

export const Payments = () => {
  return (
    <Typography variant="h6">
      To manage your payments, open the{' '}
      <Link href="https://dashboard.stripe.com/test/payments">
        Stripe dashboard
      </Link>
    </Typography>
  );
};
