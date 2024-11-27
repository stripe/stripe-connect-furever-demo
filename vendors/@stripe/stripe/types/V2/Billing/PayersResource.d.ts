// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        interface PayerCreateParams {
          /**
           * The ID of the Customer object.
           */
          customer: string;

          /**
           * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
           */
          metadata?: Stripe.MetadataParam;
        }
      }

      namespace Billing {
        interface PayerRetrieveParams {}
      }

      namespace Billing {
        interface PayerListParams {
          /**
           * If provided, only Payers for the provided customer ID will be returned.
           */
          customer?: string;

          /**
           * Optionally set the maximum number of results per page. Defaults to 20.
           */
          limit?: number;

          /**
           * Opaque page token.
           */
          page?: string;
        }
      }

      namespace Billing {
        class PayersResource {
          /**
           * Create a Payer object.
           */
          create(
            params: PayerCreateParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.Payer>>;

          /**
           * Retrieve a Payer object.
           */
          retrieve(
            id: string,
            params?: PayerRetrieveParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.Payer>>;
          retrieve(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.Payer>>;

          /**
           * List all the Payers.
           */
          list(
            params?: PayerListParams,
            options?: RequestOptions
          ): ApiListPromise<Stripe.V2.Billing.Payer>;
          list(
            options?: RequestOptions
          ): ApiListPromise<Stripe.V2.Billing.Payer>;
        }
      }
    }
  }
}
