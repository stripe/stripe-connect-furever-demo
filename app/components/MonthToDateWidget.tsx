'use client';

import React from 'react';
import Container from './Container';
import {Badge} from '@/components/ui/badge';
import {SparkLineChart} from '@mui/x-charts/SparkLineChart';

type MonthToDateWidgetProps = {
  chartWidth?: number;
};

const MonthToDateWidget = ({chartWidth}: MonthToDateWidgetProps) => {
  return (
    <Container>
      <div className="flex flex-row justify-between gap-5">
        <div className="space-y-1 min-w-[110px]">
          <h1 className="font-bold text-subdued">Month-to-date</h1>
          <div className="flex flex-row space-x-2 items-center">
            <div className="text-xl font-bold">$13.3k</div>
            <Badge className="rounded-md bg-success border-success-border pb-0 pl-1 pr-1 pt-0 h-6 text-success-foreground">
              +7.5%
            </Badge>
          </div>
        </div>
        <div className="relative w-full">
          <div
            className={`${
              !chartWidth
                ? 'w-full'
                : ''
            } absolute right-0`}>
            <SparkLineChart
              data={[0, 10, 25, 20, 15, 5, 30, 40, 55, 40, 45, 55]}
              height={55}
              width={chartWidth}
              colors={["#DEDDE1"]}
              curve="natural"
              className="right-0"
            />
          </div>
          <div
            className={`${
              !chartWidth
                ? 'w-full'
                : ''
            } absolute right-0`}>
            <SparkLineChart
              data={[5, 10, 15, 0, 20, 25, 50, 40, 35, 30, 45, 55]}
              height={55}
              width={chartWidth}
              colors={['#221B35']}
              curve="natural"
              className="right-0"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MonthToDateWidget;
