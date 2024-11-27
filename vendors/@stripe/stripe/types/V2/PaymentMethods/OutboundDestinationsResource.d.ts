// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace PaymentMethods {
        interface OutboundDestinationListParams {
          /**
           * The page size.
           */
          limit?: number;

          /**
           * The requested page.
           */
          page?: string;
        }
      }

      namespace PaymentMethods {
        class OutboundDestinationsResource {
          /**
           * List objects that can be used as destinations for outbound money movement via OutboundPayment.
           */
          list(
            params?: OutboundDestinationListParams,
            options?: RequestOptions
          ): ApiListPromise<Stripe.V2.PaymentMethods.OutboundDestination>;
          list(
            options?: RequestOptions
          ): ApiListPromise<Stripe.V2.PaymentMethods.OutboundDestination>;
        }
      }
    }
  }
}
