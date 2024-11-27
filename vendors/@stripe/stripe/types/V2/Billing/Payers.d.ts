// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        /**
         * The Payer object.
         */
        interface Payer {
          /**
           * The ID of the Payer object.
           */
          id: string;

          /**
           * String representing the object's type. Objects of the same type share the same value of the object field.
           */
          object: 'v2.billing.payer';

          /**
           * Timestamp of when the object was created.
           */
          created: string;

          /**
           * The ID of the Customer object.
           */
          customer: string;

          /**
           * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
           */
          metadata: Stripe.Metadata | null;
        }
      }
    }
  }
}
