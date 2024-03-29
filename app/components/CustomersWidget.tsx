'use client';

import React from 'react';
import Container from './Container';
import {Badge} from '@/components/ui/badge';
import {SparkLineChart} from '@mui/x-charts/SparkLineChart';

type CustomersWidgetProps = {
  chartWidth: number;
};

const CustomersWidget = ({chartWidth}: CustomersWidgetProps) => {
  return (
    <Container>
      <div className="flex flex-row justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-subdued">Customers</h1>
          <div className="flex flex-row space-x-2">
            <div className="font-bold text-xl">424</div>
            <Badge className="bg-success text-success-foreground rounded-md pb-0 pt-0 pl-1 pr-1">
              +12.5%
            </Badge>
          </div>
        </div>
        <div>
          <SparkLineChart
            data={[3, 2, 10, 24, 8, 10, 14, 25, 30]}
            height={50}
            width={chartWidth}
            colors={['black']}
          />
        </div>
      </div>
    </Container>
  );
};

export default CustomersWidget;
