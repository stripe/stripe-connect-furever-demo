'use client';

import {
  ConnectBalanceReport,
  ConnectPayoutReconciliationReport,
} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';

export default function Reports() {
  return (
    <>
      <header className="flex flex-col justify-between md:flex-row">
        <h1 className="text-3xl font-bold">Reports</h1>
      </header>
      <Tabs defaultValue="balance">
        <TabsList>
          <TabsTrigger
            value="balance"
            className="data-[state=active]:text-primary"
          >
            Balance summary
          </TabsTrigger>
          <TabsTrigger
            value="payouts"
            className="data-[state=active]:text-primary"
          >
            Payout reconciliation
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="balance"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <Container>
            <EmbeddedComponentContainer componentName="BalanceReport">
              <ConnectBalanceReport />
            </EmbeddedComponentContainer>
          </Container>
        </TabsContent>
        <TabsContent
          value="payouts"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <Container>
            <EmbeddedComponentContainer componentName="PayoutReconciliationReport">
              <ConnectPayoutReconciliationReport />
            </EmbeddedComponentContainer>
          </Container>
        </TabsContent>
      </Tabs>
    </>
  );
}
