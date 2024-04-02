'use client';

import React from 'react';
import Container from './Container';
import {Badge} from '@/components/ui/badge';
import {SparkLineChart} from '@mui/x-charts/SparkLineChart';

type CustomersWidgetProps = {
  chartMaxWidth?: number;
};

const CustomersWidget = ({chartMaxWidth}: CustomersWidgetProps) => {
  return (
    <Container>
      <div className="flex flex-row justify-between gap-5">
        <div className="space-y-1 min-w-[110px]">
          <h1 className="font-bold text-subdued">Customers</h1>
          <div className="flex flex-row space-x-2 items-center">
            <div className="text-xl font-bold">424</div>
            <Badge className="rounded-md bg-success border-success-border pb-0 pl-1 pr-1 pt-0 h-6 text-success-foreground">
              +3.1%
            </Badge>
          </div>
        </div>
        <div className="relative w-full">
          <div
            className={`absolute w-full max-w-[${chartMaxWidth}px] right-0`}>
            <SparkLineChart
              data={[0, 10, 5, 20, 10, 10, 0, 25, 25, 55, 35, 35, 40]}
              height={55}
              colors={['#DEDDE1']}
              curve="natural"
              showHighlight={true}
            />
          </div>
          <div
            className={`absolute w-full max-w-[${chartMaxWidth}px] right-0`}>
            <SparkLineChart
              data={[15, 20, 20, 0, 15, 30, 30, 55, 45, 45, 35, 50, 45, 55]}
              height={55}
              colors={['#221B35']}
              curve="natural"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CustomersWidget;
