// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      interface FinancialAccountRetrieveParams {}

      interface FinancialAccountListParams {
        /**
         * The page limit.
         */
        limit?: number;

        /**
         * The page token.
         */
        page?: string;
      }

      class FinancialAccountsResource {
        /**
         * Retrieves the details of an existing FinancialAccount.
         */
        retrieve(
          id: string,
          params?: FinancialAccountRetrieveParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.FinancialAccount>>;
        retrieve(
          id: string,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.FinancialAccount>>;

        /**
         * Lists FinancialAccounts in this compartment.
         */
        list(
          params?: FinancialAccountListParams,
          options?: RequestOptions
        ): ApiListPromise<Stripe.V2.FinancialAccount>;
        list(
          options?: RequestOptions
        ): ApiListPromise<Stripe.V2.FinancialAccount>;
      }
    }
  }
}
