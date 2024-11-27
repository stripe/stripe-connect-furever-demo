declare module '@stripe/stripe' {
  namespace Stripe {
    type UpcomingInvoice = Omit<Stripe.Invoice, 'id'>;
  }
}
