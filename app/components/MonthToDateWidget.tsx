import React from 'react';
import Container from './Container';
import {Badge} from '@/components/ui/badge';

const MonthToDateWidget = () => {
  return (
    <Container>
      <div className="flex flex-row justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-subdued">Month-to-date</h1>
          <div className="flex flex-row space-x-2">
            <div className="font-bold text-xl">$13.3k</div>
            <Badge className="bg-success text-success-foreground rounded-md pb-0 pt-0 pl-1 pr-1">
              +12.5%
            </Badge>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MonthToDateWidget;
