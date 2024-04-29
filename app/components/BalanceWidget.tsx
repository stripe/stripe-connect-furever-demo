import React from 'react';
import Link from 'next/link';
import Container from './Container';
import {ChevronRight} from 'lucide-react';

const BalanceWidget = () => {
  return (
    <Container className="px-5">
      <div className="flex flex-row justify-between space-y-1">
        <div>
          <h1 className="font-bold text-subdued">Total balance</h1>
          <div className="text-xl font-bold">$1,532</div>
        </div>
        <div>
          <Link href="/payouts" className="flex flex-row items-center">
            <div className="text-sm font-bold text-accent">
              Pay out to bank
            </div>
            <ChevronRight color="var(--accent)" size={20} className="mt-[1px]" />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default BalanceWidget;
