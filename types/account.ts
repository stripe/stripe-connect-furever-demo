export const businessTypes = [
  'independent_salon',
  'chain_of_salons',
  'other',
] as const;
export type BusinessType = (typeof businessTypes)[number];

export const countries = ['US', 'CA'] as const;
export type Country = (typeof countries)[number];

export const stripeDashboardTypes = ['none', 'full', 'express'] as const;
export type StripeDashboardType = (typeof stripeDashboardTypes)[number];

export const paymentLosses = ['stripe', 'application'] as const;
export type PaymentLosses = (typeof paymentLosses)[number];

export const feePayers = ['account', 'application'] as const;
export type FeePayer = (typeof feePayers)[number];

export type ControllerProperties = {
  stripeDashboardType: StripeDashboardType;
  paymentLosses: PaymentLosses;
  feePayer: FeePayer;
};
