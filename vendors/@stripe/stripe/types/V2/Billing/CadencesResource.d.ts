// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        interface CadenceCreateParams {
          /**
           * The billing cycle is the object that defines future billing cycle dates.
           */
          billing_cycle: CadenceCreateParams.BillingCycle;

          /**
           * The ID of the Payer object.
           */
          payer: string;

          /**
           * Set of key-value pairs that you can attach to an object. This can be useful
           * for storing additional information about the object in a structured format.
           */
          metadata?: Stripe.MetadataParam;
        }

        namespace CadenceCreateParams {
          interface BillingCycle {
            /**
             * The number of intervals (specified in the interval attribute) between
             * cadence billings. For example, type=month and interval_count=3 bills every
             * 3 months. If this is not provided, it will default to 1.
             */
            interval_count?: number;

            /**
             * The frequency at which a cadence bills.
             */
            type: BillingCycle.Type;

            /**
             * Specific configuration for determining billing dates when type=month.
             */
            month?: BillingCycle.Month;

            /**
             * Specific configuration for determining billing dates when type=week.
             */
            week?: BillingCycle.Week;

            /**
             * Specific configuration for determining billing dates when type=year.
             */
            year?: BillingCycle.Year;
          }

          namespace BillingCycle {
            interface Month {
              /**
               * The day to anchor the billing on for a type="month" billing cycle from
               * 1-31. If this number is greater than the number of days in the month being
               * billed, this will anchor to the last day of the month. If not provided,
               * this will default to the day the cadence was created.
               */
              day_of_month: number;
            }

            type Type = 'day' | 'month' | 'week' | 'year';

            interface Week {
              /**
               * The day of the week to bill the type=week billing cycle on.
               * Numbered from 1-7 for Monday to Sunday respectively, based on the ISO-8601
               * week day numbering. If not provided, this will default to the day the
               * cadence was created.
               */
              day_of_week: number;
            }

            interface Year {
              /**
               * The day to anchor the billing on for a type="month" billing cycle from
               * 1-31. If this number is greater than the number of days in the month being
               * billed, this will anchor to the last day of the month. If not provided,
               * this will default to the day the cadence was created.
               */
              day_of_month?: number;

              /**
               * The month to bill on from 1-12. If not provided, this will default to the
               * month the cadence was created.
               */
              month_of_year?: number;
            }
          }
        }
      }

      namespace Billing {
        interface CadenceRetrieveParams {}
      }

      namespace Billing {
        interface CadenceUpdateParams {
          /**
           * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
           */
          metadata?: Stripe.MetadataParam;

          /**
           * The ID of Payer object.
           */
          payer?: string;
        }
      }

      namespace Billing {
        interface CadenceListParams {
          /**
           * Optionally set the maximum number of results per page. Defaults to 20.
           */
          limit?: number;

          /**
           * Opaque page token.
           */
          page?: string;

          /**
           * If provided, only Cadences that specifically reference the provided payer ID will be returned.
           * Mutually exclusive with `test_clock`.
           */
          payer?: string;

          /**
           * If provided, only Cadences that specifically reference the provided test clock ID (via the
           * payer's customer's test clock) will be returned.
           * Mutually exclusive with payer.
           */
          test_clock?: string;
        }
      }

      namespace Billing {
        interface CadenceCancelParams {}
      }

      namespace Billing {
        class CadencesResource {
          /**
           * Create a billing Cadence object.
           */
          create(
            params: CadenceCreateParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.Cadence>>;

          /**
           * Retrieve a billing Cadence object.
           */
          retrieve(
            id: string,
            params?: CadenceRetrieveParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.Cadence>>;
          retrieve(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.Cadence>>;

          /**
           * Update a billing Cadence object.
           */
          update(
            id: string,
            params?: CadenceUpdateParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.Cadence>>;

          /**
           * List all the billing Cadences.
           */
          list(
            params?: CadenceListParams,
            options?: RequestOptions
          ): ApiListPromise<Stripe.V2.Billing.Cadence>;
          list(
            options?: RequestOptions
          ): ApiListPromise<Stripe.V2.Billing.Cadence>;

          /**
           * Cancel the billing cadence.
           */
          cancel(
            id: string,
            params?: CadenceCancelParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.Cadence>>;
          cancel(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.Billing.Cadence>>;
        }
      }
    }
  }
}
