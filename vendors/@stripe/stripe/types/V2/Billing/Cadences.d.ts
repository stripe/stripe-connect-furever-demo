// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        /**
         * The Cadence object.
         */
        interface Cadence {
          /**
           * The ID of the billing Cadence object.
           */
          id: string;

          /**
           * String representing the object's type. Objects of the same type share the same value of the object field.
           */
          object: 'v2.billing.cadence';

          /**
           * The billing cycle is the object that defines future billing cycle dates.
           */
          billing_cycle: Cadence.BillingCycle;

          /**
           * Timestamp of when the object was created.
           */
          created: string;

          /**
           * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
           */
          metadata: Stripe.Metadata | null;

          /**
           * The ID of the Payer object.
           */
          payer: string;

          /**
           * The current status of the cadence.
           */
          status: Cadence.Status;

          /**
           * The ID of the TestClock.
           */
          test_clock: string | null;
        }

        namespace Cadence {
          interface BillingCycle {
            /**
             * The number of intervals (specified in the interval attribute) between cadence billings. For example, type=month and interval_count=3 bills every 3 months.
             */
            interval_count: number;

            /**
             * The frequency at which a cadence bills.
             */
            type: BillingCycle.Type;

            /**
             * Specific configuration for determining billing dates when type=month.
             */
            month: BillingCycle.Month | null;

            /**
             * Specific configuration for determining billing dates when type=week.
             */
            week: BillingCycle.Week | null;

            /**
             * Specific configuration for determining billing dates when type=year.
             */
            year: BillingCycle.Year | null;
          }

          namespace BillingCycle {
            interface Month {
              /**
               * The day to anchor the billing on for a type="month" billing cycle from 1-31.
               * If this number is greater than the number of days in the month being billed,
               * this will anchor to the last day of the month.
               */
              day_of_month: number;
            }

            type Type = 'day' | 'month' | 'week' | 'year';

            interface Week {
              /**
               * The day of the week to bill the type=week billing cycle on.
               * Numbered from 1-7 for Monday to Sunday respectively, based on the ISO-8601 week day numbering.
               */
              day_of_week: number;
            }

            interface Year {
              /**
               * The day to anchor the billing on for a type="month" billing cycle from 1-31.
               * If this number is greater than the number of days in the month being billed,
               * this will anchor to the last day of the month.
               */
              day_of_month: number;

              /**
               * The month to bill on from 1-12. If not provided, this will default to the month the cadence was created.
               */
              month_of_year: number;
            }
          }

          type Status = 'active' | 'canceled';
        }
      }
    }
  }
}
