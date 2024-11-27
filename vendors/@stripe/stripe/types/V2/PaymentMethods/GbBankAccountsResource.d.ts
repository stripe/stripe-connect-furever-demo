// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace PaymentMethods {
        interface GbBankAccountCreateParams {
          /**
           * The Account Number of the bank account.
           */
          account_number: string;

          /**
           * The Sort Code of the bank account.
           */
          sort_code: string;

          /**
           * Closed Enum. The type of the bank account (checking or savings).
           */
          bank_account_type?: GbBankAccountCreateParams.BankAccountType;

          /**
           * Whether or not to automatically perform Confirmation of Payee to verify the users information
           * against what was provided by the bank. Doing so is required for all bank accounts not owned
           * by you before making domestic UK OutboundPayments.
           */
          confirmation_of_payee?: GbBankAccountCreateParams.ConfirmationOfPayee;
        }

        namespace GbBankAccountCreateParams {
          type BankAccountType = 'checking' | 'savings';

          interface ConfirmationOfPayee {
            /**
             * The business type to be checked against. Legal entity information will be used if unspecified.
             * Closed enum.
             */
            business_type?: ConfirmationOfPayee.BusinessType;

            /**
             * User specifies whether Confirmation of Payee is automatically initiated when creating the bank account.
             */
            initiate: boolean;

            /**
             * The name to be checked against. Legal entity information will be used if unspecified.
             */
            name?: string;
          }

          namespace ConfirmationOfPayee {
            type BusinessType = 'business' | 'personal';
          }
        }
      }

      namespace PaymentMethods {
        interface GbBankAccountRetrieveParams {}
      }

      namespace PaymentMethods {
        interface GbBankAccountAcknowledgeConfirmationOfPayeeParams {}
      }

      namespace PaymentMethods {
        interface GbBankAccountArchiveParams {}
      }

      namespace PaymentMethods {
        interface GbBankAccountInitiateConfirmationOfPayeeParams {
          /**
           * The business type to be checked against. Legal entity information will be used if unspecified.
           */
          business_type?: GbBankAccountInitiateConfirmationOfPayeeParams.BusinessType;

          /**
           * The name of the user to be checked against. Legal entity information will be used if unspecified.
           */
          name?: string;
        }

        namespace GbBankAccountInitiateConfirmationOfPayeeParams {
          type BusinessType = 'business' | 'personal';
        }
      }

      namespace PaymentMethods {
        class GbBankAccountsResource {
          /**
           * Create a GB bank account.
           */
          create(
            params: GbBankAccountCreateParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.GbBankAccount>>;

          /**
           * Retrieve a GB bank account.
           */
          retrieve(
            id: string,
            params?: GbBankAccountRetrieveParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.GbBankAccount>>;
          retrieve(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.GbBankAccount>>;

          /**
           * Confirm that you have received the result of the Confirmation of Payee request, and that you are okay with
           * proceeding to pay out to this bank account despite the account not matching, partially matching, or the service
           * being unavailable. Once you confirm this, you will be able to send OutboundPayments, but this may lead to
           * funds being sent to the wrong account, which we might not be able to recover.
           */
          acknowledgeConfirmationOfPayee(
            id: string,
            params?: GbBankAccountAcknowledgeConfirmationOfPayeeParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.GbBankAccount>>;
          acknowledgeConfirmationOfPayee(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.GbBankAccount>>;

          /**
           * Archive a GbBankAccount object. Archived GbBankAccount objects cannot be used as outbound destinations
           * and will not appear in the outbound destination list.
           */
          archive(
            id: string,
            params?: GbBankAccountArchiveParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.GbBankAccount>>;
          archive(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.GbBankAccount>>;

          /**
           * Initiate Confirmation of Payee (CoP) in order to verify that the owner of a UK bank account matches
           * who you expect. This must be done on all UK bank accounts before sending domestic OutboundPayments. If
           * the result is a partial match or a non match, explicit acknowledgement using AcknowledgeConfirmationOfPayee
           * is required before sending funds.
           */
          initiateConfirmationOfPayee(
            id: string,
            params?: GbBankAccountInitiateConfirmationOfPayeeParams,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.GbBankAccount>>;
          initiateConfirmationOfPayee(
            id: string,
            options?: RequestOptions
          ): Promise<Stripe.Response<Stripe.V2.PaymentMethods.GbBankAccount>>;
        }
      }
    }
  }
}
