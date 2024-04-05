export {default} from 'next-auth/middleware';

export const config = {
  // specify the route you want to protect
  matcher: [
    '/',
    '/classes',
    '/payments',
    '/payouts',
    '/finances',
    '/finances/cards',
    '/finances/loans',
    '/settings',
    '/settings/paymentmethods',
    '/finance',
  ],
};
