// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        namespace RateCards {
          interface RateCreateParams {
            /**
             * The ID of the Price object to take price information from. The Price must have the same interval as the RateCard.
             * Updates to the Price will not be reflected in the RateCard or its rates.
             */
            price: string;

            /**
             * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
             */
            metadata?: Stripe.MetadataParam;
          }
        }
      }

      namespace Billing {
        namespace RateCards {
          interface RateRetrieveParams {}
        }
      }

      namespace Billing {
        namespace RateCards {
          interface RateListParams {
            /**
             * Optionally filter by a BillableItem.
             */
            billable_item?: string;

            /**
             * Optionally set the maximum number of results per page. Defaults to 20.
             */
            limit?: number;

            /**
             * Opaque page token.
             */
            page?: string;

            /**
             * Optionally filter by a RateCard version. If not specified, defaults to the latest version.
             */
            rate_card_version?: string;
          }
        }
      }

      namespace Billing {
        namespace RateCards {
          class RatesResource {
            /**
             * Set the rate for a BillableItem on the latest version of a RateCard object. This will create a new RateCard version
             * if the BillableItem already has a rate on the RateCard.
             */
            create(
              id: string,
              params: RateCreateParams,
              options?: RequestOptions
            ): Promise<Stripe.Response<Stripe.V2.Billing.RateCardRate>>;

            /**
             * Retrieve a Rate object.
             */
            retrieve(
              rateCardIdId: string,
              id: string,
              params?: RateRetrieveParams,
              options?: RequestOptions
            ): Promise<Stripe.Response<Stripe.V2.Billing.RateCardRate>>;
            retrieve(
              rateCardIdId: string,
              id: string,
              options?: RequestOptions
            ): Promise<Stripe.Response<Stripe.V2.Billing.RateCardRate>>;

            /**
             * List all Rates associated with a RateCard for a specific version (defaults to latest). Rates remain active for all subsequent versions until a new Rate is created for the same BillableItem.
             */
            list(
              id: string,
              params?: RateListParams,
              options?: RequestOptions
            ): ApiListPromise<Stripe.V2.Billing.RateCardRate>;
            list(
              id: string,
              options?: RequestOptions
            ): ApiListPromise<Stripe.V2.Billing.RateCardRate>;
          }
        }
      }
    }
  }
}
