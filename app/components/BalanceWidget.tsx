import React from 'react';
import Link from 'next/link';
import Container from './Container';
import {ChevronRight} from 'lucide-react';

const BalanceWidget = () => {
  return (
    <Container>
      <div className="flex flex-row justify-between space-y-1">
        <div>
          <h1 className="font-bold text-subdued">Total balance</h1>
          <div className="font-bold text-xl">$1,532</div>
        </div>
        <div>
          <Link href="/payouts" className="items-center flex flex-row">
            <div className="text-secondary text-sm font-bold">
              Pay out to bank
            </div>
            <ChevronRight color="#f26552" size={18} className="mt-[1px]" />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default BalanceWidget;
