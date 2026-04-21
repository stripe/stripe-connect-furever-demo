import Stripe from 'stripe';
import {
  FINANCING_OFFER_PRODUCT_TYPES_ARRAY,
  FLEX_LOAN_OFFER_STATES_ARRAY,
} from './constants';

export type OfferState =
  | Stripe.Capital.FinancingOfferListParams['status']
  | 'no_offer';

export type TestmodeFinancingForm = {
  financingOfferType: FinancingOfferProductType;
  offerState: OfferState;
};

export type TestmodeFinancingFormType =
  | 'create'
  | 'expire'
  | 'approve_reject'
  | 'fully_repay';

export type FinancingOfferProductType =
  (typeof FINANCING_OFFER_PRODUCT_TYPES_ARRAY)[number];

export type FlexLoanOfferStates = (typeof FLEX_LOAN_OFFER_STATES_ARRAY)[0];

// Side by Side Offer States
export const SIDE_BY_SIDE_OFFER_STATES_ARRAY: Array<
  Extract<Stripe.Capital.FinancingOfferListParams['status'], 'delivered'>
> = ['delivered'] as const;

// Helpers

export const enumValueToSentenceCase = (value: String) => {
  const words = value.split('_');
  words[0] = words[0].at(0)?.toUpperCase() + words[0].substring(1);
  return words.join(' ');
};
