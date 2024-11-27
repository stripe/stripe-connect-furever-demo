// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace PaymentMethods {
        interface CardCreateParams {
          /**
           * The expiration month of the card.
           */
          exp_month: string;

          /**
           * The expiration year of the card.
           */
          exp_year: string;

          /**
           * The card number.
           */
          number: string;

          /**
           * The billing details of the card.
           */
          billing_details?: CardCreateParams.BillingDetails;

          /**
           * The cvc of the card.
           */
          cvc?: string;

          /**
           * The preconditions to follow during creation.
           */
          preconditions?: CardCreateParams.Preconditions;
        }

        namespace CardCreateParams {
          interface BillingDetails {
            /**
             * The billing address of the card.
             */
            address?: Stripe.AddressParam;

            /**
             * The name on the card.
             */
            name?: string;
          }

          interface Preconditions {
            /**
             * When set to true, only creates outbound supported card resources.
             * Cards that don't support outbound will fail on creation with card_outbound_supportability_invalid.
             */
            outbound_supported: boolean;
          }
        }
      }

      namespace PaymentMethods {
        interface CardRetrieveParams {}
      }

      namespace PaymentMethods {
        interface CardUpdateParams {
          /**
           * The billing address of the card.
           */
          billing_details?: CardUpdateParams.BillingDetails;

          /**
           * The cvc of the card.
           */
          cvc?: string;

          /**
           * The expiration month of the card.
           */
          exp_month?: string;

          /**
           * The expiration year of the card.
           */
          exp_year?: string;
        }

        namespace CardUpdateParams {
          interface BillingDetails {
            /**
             * The billing address of the card.
             */
            address?: Stripe.AddressParam;

            /**
             * The name on the card.
             */
            name?: string;
          }
        }
      }

      namespace PaymentMethods {
        interface CardArchiveParams {}
      }

      namespace PaymentMethods {
        class CardsResource {
          /**
           * Create a card object.
           * Must be a PCI compliant user with access to raw card data APIs (https://support.stripe.com/questions/enabling-access-to-raw-card-data-apis).
           * @throws Stripe.InvalidPaymentMethodError
           * @throws Stripe.QuotaExceededError
           */
          create(
            params: CardCreateParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.Card>>;

          /**
           * Retrieve a card object.
           */
          retrieve(
            id: string,
            params?: CardRetrieveParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.Card>>;
          retrieve(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.Card>>;

          /**
           * Update a card object.
           * Must be a PCI compliant user with access to raw card data APIs (https://support.stripe.com/questions/enabling-access-to-raw-card-data-apis).
           * @throws Stripe.QuotaExceededError
           * @throws Stripe.InvalidPaymentMethodError
           */
          update(
            id: string,
            params?: CardUpdateParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.Card>>;

          /**
           * Archive a card object.
           */
          archive(
            id: string,
            params?: CardArchiveParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.Card>>;
          archive(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.Card>>;
        }
      }
    }
  }
}
