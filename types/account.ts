export const businessTypes = ['individual', 'company', 'other'] as const;
export type BusinessType = (typeof businessTypes)[number];

export const countries = [
  'AL',
  'AG',
  'AR',
  'AM',
  'AU',
  'AT',
  'BS',
  'BH',
  'BE',
  'BJ',
  'BO',
  'BA',
  'BW',
  'BR',
  'BN',
  'BG',
  'KH',
  'CA',
  'CL',
  'CO',
  'CR',
  'HR',
  'CY',
  'CZ',
  'CI',
  'DK',
  'DO',
  'EC',
  'EG',
  'SV',
  'EE',
  'ET',
  'FI',
  'FR',
  'GM',
  'DE',
  'GH',
  'GR',
  'GT',
  'GY',
  'HK',
  'HU',
  'IS',
  'IN',
  'IE',
  'IL',
  'IT',
  'JM',
  'JP',
  'JO',
  'KE',
  'KR',
  'KW',
  'LV',
  'LI',
  'LT',
  'LU',
  'MO',
  'MG',
  'MY',
  'MT',
  'MU',
  'MX',
  'MD',
  'MC',
  'MN',
  'MA',
  'NA',
  'NL',
  'NZ',
  'NG',
  'MK',
  'NO',
  'OM',
  'PK',
  'PA',
  'PY',
  'PE',
  'PH',
  'PL',
  'PT',
  'QA',
  'RO',
  'RW',
  'LC',
  'SA',
  'SN',
  'RS',
  'SG',
  'SK',
  'SI',
  'ZA',
  'ES',
  'LK',
  'SE',
  'CH',
  'TW',
  'TZ',
  'TH',
  'TT',
  'TN',
  'TR',
  'AE',
  'GB',
  'US',
  'UY',
  'UZ',
  'VN',
] as const;
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
