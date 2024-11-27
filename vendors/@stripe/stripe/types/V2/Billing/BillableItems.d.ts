// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        /**
         * The BillableItem object.
         */
        interface BillableItem {
          /**
           * The ID of the BillableItem.
           */
          id: string;

          /**
           * String representing the object's type. Objects of the same type share the same value of the object field.
           */
          object: 'v2.billing.billable_item';

          /**
           * Timestamp of when the object was created.
           */
          created: string;

          /**
           * The customer facing name for the BillableItem, this will be used on the Invoice.
           */
          display_name: string;

          /**
           * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
           */
          metadata: Stripe.Metadata | null;
        }
      }
    }
  }
}
