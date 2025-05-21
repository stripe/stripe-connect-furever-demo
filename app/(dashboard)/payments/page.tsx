'use client';

import * as React from 'react';
import Container from '@/app/components/Container';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';

export default function Payments() {
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
      </Container>
    </>
  );
}
