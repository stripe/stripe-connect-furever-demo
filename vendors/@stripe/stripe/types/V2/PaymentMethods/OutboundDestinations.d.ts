// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace PaymentMethods {
        /**
         * The OutboundDestination object.
         */
        interface OutboundDestination {
          /**
           * ID of the outbound destination.
           */
          id: string;

          /**
           * String representing the object's type. Objects of the same type share the same value of the object field.
           */
          object: 'payment_methods.outbound_destination';

          /**
           * The destination bank account object details.
           */
          bank_account: OutboundDestination.BankAccount | null;

          /**
           * The destination card object details.
           */
          card: OutboundDestination.Card | null;

          /**
           * Created timestamp.
           */
          created: string;

          /**
           * Whether the payment method is outbound eligible. Possible values are eligible, invalid, or requires_action.
           */
          eligibility: string;

          /**
           * If the eligibility is requires_action, lists the steps that must be taken to make this card eligible.
           */
          eligibility_reason: OutboundDestination.EligibilityReason;

          /**
           * Closed Enum. The type of destination.
           */
          type: OutboundDestination.Type;
        }

        namespace OutboundDestination {
          interface BankAccount {
            /**
             * Whether this bank account object was archived. Bank account objects can be archived through
             * the /archive API, and they will not be automatically archived by Stripe. Archived bank account objects
             * cannot be used as outbound destinations and will not appear in the outbound destination list.
             */
            archived: boolean;

            /**
             * The name of the bank this bank account is in. This field is populated automatically by Stripe.
             */
            bank_name: string;

            /**
             * The country code of the bank account.
             */
            country: string;

            /**
             * List of enabled flows for this bank account (wire or local).
             */
            enabled_methods: Array<string>;

            /**
             * The last 4 digits of the account number.
             */
            last4: string;

            /**
             * The routing number of the bank account, if present.
             */
            routing_number: string | null;

            /**
             * The list of currencies supported by this bank account.
             */
            supported_currencies: Array<string>;

            /**
             * The type of this bank account object.
             */
            type: string;
          }

          interface Card {
            /**
             * Whether the card was archived. Card objects can be archived through
             * the /archive API, and they will not be automatically archived by Stripe. Archived card objects
             * cannot be used as outbound destinations and will not appear in the outbound destination list.
             */
            archived: boolean;

            /**
             * The billing information of the card, including the card holder name and address.
             */
            billing_details: Card.BillingDetails;

            /**
             * The month the card expires.
             */
            exp_month: string;

            /**
             * The year the card expires.
             */
            exp_year: string;

            /**
             * The last 4 digits of the card number.
             */
            last4: string;

            /**
             * The type of the card object.
             */
            type: string;
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
          }

          interface EligibilityReason {
            invalid_parameter: Array<'expired_instrument'>;
          }

          type Type = 'bank_account' | 'card';
        }
      }
    }
  }
}
