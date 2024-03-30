import React from 'react';
import Container from './Container';
import {Badge} from '@/components/ui/badge';

const CustomersWidget = () => {
  return (
    <Container>
      <div className="flex flex-row justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-subdued">Customers</h1>
          <div className="flex flex-row space-x-2">
            <div className="text-xl font-bold">424</div>
            <Badge className="rounded-md bg-success pb-0 pl-1 pr-1 pt-0 text-success-foreground">
              +3.9%
            </Badge>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CustomersWidget;
