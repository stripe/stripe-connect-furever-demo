// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Billing {
        /**
         * The RateCardSubscription object.
         */
        interface RateCardSubscription {
          /**
           * The ID of the RateCardSubscription.
           */
          id: string;

          /**
           * String representing the object's type. Objects of the same type share the same value of the object field.
           */
          object: 'v2.billing.rate_card_subscription';

          /**
           * The ID of the billing Cadence.
           */
          billing_cadence: string;

          /**
           * Timestamp of when the object was created.
           */
          created: string;

          /**
           * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
           */
          metadata: Stripe.Metadata | null;

          /**
           * The ID of the RateCard.
           */
          rate_card: string;

          /**
           * The ID of the RateCardVersion.
           */
          rate_card_version: string;

          /**
           * The status of the RateCardSubscription.
           */
          status: RateCardSubscription.Status;

          /**
           * The status transitions of the RateCardSubscription. Optional if the rate card subscription was not activated during creation.
           */
          status_transitions: RateCardSubscription.StatusTransitions | null;

          /**
           * The ID of the Test Clock, if any.
           */
          test_clock: string | null;
        }

        namespace RateCardSubscription {
          type Status = 'active' | 'canceled';

          interface StatusTransitions {
            /**
             * When the rate card subscription was activated.
             */
            activated_at: string | null;

            /**
             * When the rate card subscription was canceled.
             */
            canceled_at: string | null;
          }
        }
      }
    }
  }
}
