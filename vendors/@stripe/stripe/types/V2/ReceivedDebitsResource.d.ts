// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      interface ReceivedDebitRetrieveParams {}

      interface ReceivedDebitListParams {
        /**
         * The page limit.
         */
        limit?: number;

        /**
         * The page token.
         */
        page?: string;
      }

      class ReceivedDebitsResource {
        /**
         * Retrieves a single ReceivedDebit by ID.
         */
        retrieve(
          id: string,
          params?: ReceivedDebitRetrieveParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.ReceivedDebit>>;
        retrieve(
          id: string,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.ReceivedDebit>>;

        /**
         * Retrieves a list of ReceivedDebits, given the selected filters.
         */
        list(
          params?: ReceivedDebitListParams,
          options?: RequestOptions
        ): ApiListPromise<Stripe.V2.ReceivedDebit>;
        list(options?: RequestOptions): ApiListPromise<Stripe.V2.ReceivedDebit>;
      }
    }
  }
}
