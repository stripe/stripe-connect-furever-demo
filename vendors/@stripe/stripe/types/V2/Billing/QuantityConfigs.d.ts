// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        /**
         * The QuantityConfig object.
         */
        interface QuantityConfig {
          /**
           * The ID of the QuantityConfig.
           */
          id: string;

          /**
           * String representing the object's type. Objects of the same type share the same value of the object field.
           */
          object: 'v2.billing.quantity_config';

          /**
           * The ID of the BillableItem to QuantityConfig is for.
           */
          billable_item: string;

          /**
           * Timestamp of when the object was created.
           */
          created: string;

          /**
           * The ID of the billing Meter.
           */
          meter: string;

          /**
           * Optional meter segment conditions you can scope this BillableItem to.
           */
          meter_segment_conditions: Array<QuantityConfig.MeterSegmentCondition>;
        }

        namespace QuantityConfig {
          interface MeterSegmentCondition {
            /**
             * The meter dimension key.
             */
            dimension: string;

            /**
             * The value to match for the specified meter dimension key.
             */
            value: string;
          }
        }
      }
    }
  }
}
