export {default} from 'next-auth/middleware';

export const config = {
  // specify the route you want to protect
  matcher: [
    '/dashboard',
    '/dashboard/classes',
    '/dashboard/payments',
    '/dashboard/payouts',
    '/dashboard/finance',
    '/dashboard/settings',
  ],
};
