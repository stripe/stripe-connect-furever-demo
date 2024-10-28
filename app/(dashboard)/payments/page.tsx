'use client';

import * as React from 'react';
import Container from '@/app/components/Container';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';
import {useSession} from 'next-auth/react';
import {useGetCharges} from '@/app/hooks/useGetCharges';

export default function Payments() {
  const {data: session} = useSession();

  const {data: charges, isLoading, error} = useGetCharges();

  if (!session) {
    return <p>This page requires a session!</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading || !charges) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Payments</h1>
      </div>
      <div className="flex flex-col gap-3 md:gap-5 lg:flex-row">
        <div className="flex-1">
          <MonthToDateWidget />
        </div>
        <div className="flex-1">
          <CustomersWidget />
        </div>
      </div>
      <Container>
        <h1 className="text-xl font-bold">Recent payments</h1>
        <p>Here&apos;s a (very basic) payments table:</p>
        <p>
          If you see no entries here, the account has no payments. You can use
          &quot;open tools&quot; -&gt; &quot;create test payments&quot; to
          create some.
        </p>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Customer</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {charges.map((charge) => (
              <tr key={charge.id}>
                <td>{charge.amount}</td>
                <td>{charge.receipt_email}</td>
                <td>{new Date(charge.created * 1000).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
}
