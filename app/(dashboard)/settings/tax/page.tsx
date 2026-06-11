'use client';

import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {
  ConnectTaxSettings,
  ConnectTaxRegistrations,
  ConnectTaxThresholdMonitoring,
  ConnectExportTaxTransactions,
  ConnectProductTaxCodeSelector,
} from '@stripe/react-connect-js';
import {arePreviewComponentsEnabled} from '../../utils/arePreviewComponentsEnabled';

export default function Tax() {
  return (
    <>
      <Container>
        <h1 className="text-xl font-semibold">Tax</h1>
        <p className="text-subdued">
          Configure these settings to automatically calculate and collect tax on
          your payments.
        </p>
        <EmbeddedComponentContainer componentName="TaxSettings">
          <ConnectTaxSettings />
        </EmbeddedComponentContainer>
      </Container>
      <Container>
        <h1 className="text-xl font-semibold">Tax registrations</h1>
        <p className="text-subdued">
          Locations where you have a registration, and want to collect taxes.
        </p>
        <EmbeddedComponentContainer componentName="TaxRegistrations">
          <ConnectTaxRegistrations />
        </EmbeddedComponentContainer>
      </Container>
      {arePreviewComponentsEnabled && (
        <>
          <Container>
            <h1 className="text-xl font-semibold">Product tax code</h1>
            <p className="text-subdued">
              Assign a tax code to your &ldquo;Wash and groom&rdquo; service so
              Stripe Tax calculates the correct tax on each booking.
            </p>
            <EmbeddedComponentContainer
              componentName="ProductTaxCodeSelector"
              isPreviewComponent
            >
              <ConnectProductTaxCodeSelector
                initialTaxCode="txcd_20030003"
                onTaxCodeSelect={(id) => {
                  // Normally we'd update the tax code here via an API. However since this is a demo implementation, we simply log to console
                  console.log('Selected tax code for Wash and groom:', id);
                }}
              />
            </EmbeddedComponentContainer>
          </Container>
          <Container>
            <h1 className="text-xl font-semibold">Threshold Monitoring</h1>
            <p className="text-subdued">
              Sales tracked by tax location. Locations where thresholds have
              been exceeded may require registering to collect taxes.
            </p>
            <EmbeddedComponentContainer
              componentName="TaxThresholdMonitoring"
              isPreviewComponent
            >
              <ConnectTaxThresholdMonitoring />
            </EmbeddedComponentContainer>
          </Container>
          <Container>
            <h1 className="text-xl font-semibold">Export tax transactions</h1>
            <p className="text-subdued">
              Retrieve and export your tax transactions for reporting and
              analysis purposes, ensuring compliance with tax regulations.
            </p>
            <EmbeddedComponentContainer componentName="ExportTaxTransactions">
              <ConnectExportTaxTransactions />
            </EmbeddedComponentContainer>
          </Container>
        </>
      )}
    </>
  );
}
