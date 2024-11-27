// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        interface BillableItemRetrieveParams {}
      }

      namespace Billing {
        interface BillableItemListParams {
          /**
           * The page size limit, if not provided the default is 20.
           */
          limit?: number;

          /**
           * The pagination token.
           */
          page?: string;
        }
      }

      namespace Billing {
        class BillableItemsResource {
          /**
           * Retrieve a BillableItem by ID.
           */
          retrieve(
            id: string,
            params?: BillableItemRetrieveParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.BillableItem>>;
          retrieve(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.BillableItem>>;

          /**
           * List all BillableItem objects.
           */
          list(
            params?: BillableItemListParams,
            options?: RequestOptions
          ): ApiListPromise<Stripe.V2.Billing.BillableItem>;
          list(
            options?: RequestOptions
          ): ApiListPromise<Stripe.V2.Billing.BillableItem>;
        }
      }
    }
  }
}
