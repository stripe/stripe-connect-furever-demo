import React from 'react';
import {ConnectCapitalFinancingPromotion} from '@stripe/react-connect-js';
import {FinancingProductType} from '@stripe/connect-js';

import type {FinancingPromotionLayoutType} from '@stripe/connect-js';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import Container from './Container';

export function CapitalFinancingPromotionSection({
  className = '',
  layout = 'full',
}: {
  className?: string;
  layout?: FinancingPromotionLayoutType;
}) {
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
    <Container
      className={[className, showFinancingOffer ? '' : 'hidden']
        .filter(Boolean)
        .join(' ')}
    >
      <EmbeddedComponentContainer componentName="CapitalFinancingPromotion">
        <ConnectCapitalFinancingPromotion
          onEligibleFinancingOfferLoaded={handleFinancingOfferLoaded}
          layout={layout}
        />
      </EmbeddedComponentContainer>
    </Container>
  );
}
