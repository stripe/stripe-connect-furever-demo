import {Stripe} from 'stripe';
import {
  FinancingOfferProductType,
  OfferState,
  SIDE_BY_SIDE_OFFER_STATES_ARRAY,
} from './types';

export const FINANCING_OFFER_PRODUCT_TYPES_ARRAY = [
  'flex_loan',
  'side_by_side',
  'line_of_credit',
] as const;

// Temporary until line of credit is fully supported
export const LINE_OF_CREDIT_PRODUCT_TYPES_ARRAY = [
  'line_of_credit',
  'side_by_side',
] as const;

// Flex Loan Offer States
export const FLEX_LOAN_OFFER_STATES_ARRAY: Array<
  Extract<
    Stripe.Capital.FinancingOfferListParams.Status,
    'delivered' | 'accepted' | 'rejected' | 'fully_repaid' | 'paid_out'
  >
> = ['delivered', 'accepted', 'rejected', 'paid_out', 'fully_repaid'] as const;

// Line of Credit Offer States
export const LINE_OF_CREDIT_OFFER_STATES_ARRAY: Array<
  Extract<
    Stripe.Capital.FinancingOfferListParams.Status,
    'paid_out' | 'fully_repaid'
  >
> = ['paid_out', 'fully_repaid'] as const;

// States for Product Type
export const STATES_FOR_PRODUCT_TYPE: Record<
  FinancingOfferProductType,
  OfferState[]
> = {
  flex_loan: FLEX_LOAN_OFFER_STATES_ARRAY,
  side_by_side: SIDE_BY_SIDE_OFFER_STATES_ARRAY,
  line_of_credit: LINE_OF_CREDIT_OFFER_STATES_ARRAY,
} as const;

export const PRODUCT_TYPE_CREATE_URLS: Record<
  FinancingOfferProductType,
  string
> = {
  flex_loan: '/api/capital/create_test_financing',
  side_by_side: '/api/capital/create_side_by_side_offer',
  line_of_credit: '/api/capital/create_line_of_credit',
} as const;
