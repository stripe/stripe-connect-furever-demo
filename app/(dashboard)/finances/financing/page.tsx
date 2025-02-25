'use client';

import React, {useState, useEffect} from 'react';
import {
  ConnectCapitalFinancing,
  ConnectCapitalFinancingApplication,
  ConnectCapitalFinancingPromotion,
  ConnectComponentsProvider,
} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {LandmarkIcon, LoaderCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useFinancialAccount} from '@/app/hooks/useFinancialAccount';
import {FinancingProductType} from '@stripe/connect-js';

function CapitalFinancingPromotionSection() {
  // Only show the financing offer if there is one to show
  const [showFinancingOffer, setShowFinancingOffer] = React.useState(false);
  const handleFinancingOfferLoaded = ({productType}: FinancingProductType) => {
    switch (productType) {
      case 'none':
        setShowFinancingOffer(false);
        break;
      case 'standard':
      case 'refill':
        setShowFinancingOffer(true);
        break;
    }
  };

  return (
    <Container className={showFinancingOffer ? '' : 'hidden'}>
      <EmbeddedComponentContainer componentName="CapitalFinancingPromotion">
        <ConnectCapitalFinancingPromotion
          onEligibleFinancingOfferLoaded={handleFinancingOfferLoaded}
          layout={'full'}
        />
      </EmbeddedComponentContainer>
    </Container>
  );
}

function CapitalFinancingSection() {
  return (
    <Container>
      <EmbeddedComponentContainer componentName="CapitalFinancingPromotion">
        <ConnectCapitalFinancing onFinancingsLoaded={() => {}} />
      </EmbeddedComponentContainer>
    </Container>
  );
}

export default function FinancingPage() {
  return (
    <>
      <CapitalFinancingPromotionSection />
      <CapitalFinancingSection />
    </>
  );
}
