// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace PaymentMethods {
        /**
         * The Card object.
         */
        interface Card {
          id: string;

          /**
           * String representing the object's type. Objects of the same type share the same value of the object field.
           */
          object: 'payment_methods.card';

          /**
           * Whether this Card object was archived.
           */
          archived: boolean;

          billing_details: Card.BillingDetails;

          created: string;

          exp_month: string;

          exp_year: string;

          flows: Card.Flows;

          last4: string;
        }

        namespace Card {
          interface BillingDetails {
            /**
             * The billing address of the card.
             */
            address: Stripe.Address | null;

            /**
             * The name on the card.
             */
            name: string | null;
          }

          interface Flows {
            outbound: Flows.Outbound;
          }

          namespace Flows {
            interface Outbound {
              /**
               * Can be invalid, eligible, or requires_action
               */
              eligibility: string;

              eligibility_reason: Outbound.EligibilityReason;
            }

            namespace Outbound {
              interface EligibilityReason {
                invalid_parameter: Array<'expired_instrument'>;
              }
            }
          }
        }
      }
    }
  }
}
