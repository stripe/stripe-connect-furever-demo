// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        interface QuantityConfigRetrieveParams {}
      }

      namespace Billing {
        interface QuantityConfigListParams {
          /**
           * The ID of the BillableItem to filter to.
           */
          billable_item?: string;

          /**
           * The page size limit, if not provided the default is 20.
           */
          limit?: number;

          /**
           * Pagination request parameters.
           */
          page?: string;
        }
      }

      namespace Billing {
        class QuantityConfigsResource {
          /**
           * Retrieve a QuantityConfig object by ID.
           */
          retrieve(
            id: string,
            params?: QuantityConfigRetrieveParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.QuantityConfig>>;
          retrieve(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.QuantityConfig>>;

          /**
           * List all QuantityConfig objects.
           */
          list(
            params?: QuantityConfigListParams,
            options?: RequestOptions
          ): ApiListPromise<Stripe.V2.Billing.QuantityConfig>;
          list(
            options?: RequestOptions
          ): ApiListPromise<Stripe.V2.Billing.QuantityConfig>;
        }
      }
    }
  }
}
