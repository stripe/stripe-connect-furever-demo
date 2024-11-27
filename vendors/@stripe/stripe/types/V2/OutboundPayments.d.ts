// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      /**
       * OutboundPayment represents a single money movement from one FinancialAccount you own to an outbound destination someone else owns.
       */
      interface OutboundPayment {
        /**
         * Unique identifier for the OutboundPayment.
         */
        id: string;

        /**
         * String representing the object's type. Objects of the same type share the same value of the object field.
         */
        object: 'outbound_payment';

        /**
         * Returns true if the OutboundPayment can be canceled, and false otherwise.
         */
        cancelable: boolean;

        /**
         * Time at which the OutboundPayment was created.
         * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
         */
        created: string;

        /**
         * An arbitrary string attached to the OutboundPayment. Often useful for displaying to users.
         */
        description: string | null;

        /**
         * The date when funds are expected to arrive in the outbound destination. This field is not set if the outbound destination is in a `failed`, `canceled`, or `returned` state.
         * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
         */
        expected_arrival_date: string | null;

        /**
         * The FinancialAccount that funds were pulled from.
         */
        from: OutboundPayment.From;

        /**
         * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
         */
        metadata: Stripe.Metadata | null;

        /**
         * Method to be used to send the OutboundPayment.
         */
        method: OutboundPayment.Method;

        /**
         * Details about the OutboundPayment amounts, including source and destination amounts, and foreign exchange details.
         */
        money_movement_amounts: OutboundPayment.MoneyMovementAmounts;

        /**
         * A hosted transaction receipt URL that is provided when money movement is considered regulated under Stripe's money transmission licenses.
         */
        receipt_url: string;

        /**
         * Details about the OutboundPayment notification settings for recipient.
         */
        recipient_notification: OutboundPayment.RecipientNotification;

        /**
         * The description that appears on the receiving end for an OutboundPayment (for example, bank statement for external bank transfer).
         */
        statement_descriptor: string;

        /**
         * Closed Enum. Current status of the OutboundPayment: `processing`, `failed`, `posted`, `returned`, `canceled`.
         * An OutboundPayment is `processing` if it has been created and is processing.
         * The status changes to `posted` once the OutboundPayment has been "confirmed" and funds have left the account, or to `failed` or `canceled`.
         * If an OutboundPayment fails to arrive at its destination, its status will change to `returned`.
         */
        status: OutboundPayment.Status;

        /**
         * Status details for an OutboundPayment in a `failed` or `returned` state.
         */
        status_details: OutboundPayment.StatusDetails | null;

        /**
         * Hash containing timestamps of when the object transitioned to a particular status.
         */
        status_transitions: OutboundPayment.StatusTransitions | null;

        /**
         * To which outbound destination the OutboundPayment was sent.
         */
        to: OutboundPayment.To;
      }

      namespace OutboundPayment {
        interface From {
          /**
           * The FinancialAccount that funds were pulled from.
           */
          financial_account: string;
        }

        interface Method {
          /**
           * Open Enum. Method for bank account.
           */
          bank_account: Method.BankAccount | null;

          /**
           * Open Enum. Method for card destination.
           */
          card: 'automatic' | null;
        }

        namespace Method {
          type BankAccount = 'automatic' | 'local' | 'wire';
        }

        interface MoneyMovementAmounts {
          /**
           * Monetary amount sent to destination.
           */
          destination: Amount;

          /**
           * Monetary amount sent from source financial account.
           */
          source: Amount;
        }

        interface RecipientNotification {
          /**
           * Closed Enum. Configuration option to enable or disable notifications to recipients.
           * Do not send notifications when setting is NONE. Default to account setting when setting is CONFIGURED or not set.
           */
          setting: RecipientNotification.Setting;
        }

        namespace RecipientNotification {
          type Setting = 'configured' | 'none';
        }

        type Status =
          | 'canceled'
          | 'failed'
          | 'posted'
          | 'processing'
          | 'returned';

        interface StatusDetails {
          /**
           * The `failed` status reason.
           */
          failed: StatusDetails.Failed | null;

          /**
           * The `returned` status reason.
           */
          returned: StatusDetails.Returned | null;
        }

        namespace StatusDetails {
          interface Failed {
            /**
             * Open Enum. The `failed` status reason.
             */
            reason: Failed.Reason;
          }

          namespace Failed {
            type Reason =
              | 'destination_declined'
              | 'destination_does_not_exist'
              | 'destination_expired'
              | 'destination_unsupported'
              | 'destination_usage_frequency_limit_exceeded'
              | 'unknown_failure';
          }

          interface Returned {
            /**
             * Open Enum. The `returned` status reason.
             */
            reason: Returned.Reason;
          }

          namespace Returned {
            type Reason =
              | 'destination_canceled_by_customer'
              | 'destination_closed'
              | 'destination_currency_unsupported'
              | 'destination_does_not_exist'
              | 'destination_holder_address_incorrect'
              | 'destination_holder_details_incorrect'
              | 'destination_holder_name_incorrect'
              | 'destination_restricted'
              | 'recalled'
              | 'unknown_failure';
          }
        }

        interface StatusTransitions {
          /**
           * Timestamp describing when an OutboundPayment changed status to `canceled`.
           * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
           */
          canceled_at: string | null;

          /**
           * Timestamp describing when an OutboundPayment changed status to `failed`.
           * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
           */
          failed_at: string | null;

          /**
           * Timestamp describing when an OutboundPayment changed status to `posted`.
           * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
           */
          posted_at: string | null;

          /**
           * Timestamp describing when an OutboundPayment changed status to `returned`.
           * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
           */
          returned_at: string | null;
        }

        interface To {
          /**
           * The outbound destination to which an OutboundPayment is sent.
           */
          destination: string;

          /**
           * To which account the OutboundPayment is sent.
           */
          recipient: string;
        }
      }
    }
  }
}
