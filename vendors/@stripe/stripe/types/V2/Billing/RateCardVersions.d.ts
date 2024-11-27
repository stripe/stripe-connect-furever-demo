// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        /**
         * The RateCardVersion object.
         */
        interface RateCardVersion {
          /**
           * The ID of the RateCardVersion.
           */
          id: string;

          /**
           * String representing the object's type. Objects of the same type share the same value of the object field.
           */
          object: 'v2.billing.rate_card.version';

          /**
           * Timestamp of when the object was created.
           */
          created: string;

          /**
           * The ID of the RateCard that this version belongs to.
           */
          rate_card_id: string;
        }
      }
    }
  }
}
