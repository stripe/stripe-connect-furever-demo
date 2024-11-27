// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      /**
       * OutboundTransfer represents a single money movement from one FinancialAccount you own to an outbound destination you also own.
       */
      interface OutboundTransfer {
        /**
         * Unique identifier for the OutboundTransfer.
         */
        id: string;

        /**
         * String representing the object's type. Objects of the same type share the same value of the object field.
         */
        object: 'outbound_transfer';

        /**
         * Returns true if the OutboundTransfer can be canceled, and false otherwise.
         */
        cancelable: boolean;

        /**
         * Time at which the OutboundTransfer was created.
         * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
         */
        created: string;

        /**
         * An arbitrary string attached to the OutboundTransfer. Often useful for displaying to users.
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
        from: OutboundTransfer.From;

        /**
         * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
         */
        metadata: Stripe.Metadata | null;

        /**
         * Method to be used to send the OutboundTransfer.
         */
        method: OutboundTransfer.Method;

        /**
         * Details about the OutboundTransfer amounts, including source and destination amounts, and foreign exchange details.
         */
        money_movement_amounts: OutboundTransfer.MoneyMovementAmounts;

        /**
         * A hosted transaction receipt URL that is provided when money movement is considered regulated under Stripe's money transmission licenses.
         */
        receipt_url: string;

        /**
         * The description that appears on the receiving end for an OutboundTransfer (for example, bank statement for external bank transfer).
         */
        statement_descriptor: string;

        /**
         * Closed Enum. Current status of the OutboundTransfer: `processing`, `failed`, `posted`, `returned`, `canceled`.
         * An OutboundTransfer is `processing` if it has been created and is processing.
         * The status changes to `posted` once the OutboundTransfer has been "confirmed" and funds have left the account, or to `failed` or `canceled`.
         * If an OutboundTransfer fails to arrive at its destination, its status will change to `returned`.
         */
        status: OutboundTransfer.Status;

        /**
         * Status details for an OutboundTransfer in a `failed` or `returned` state.
         */
        status_details: OutboundTransfer.StatusDetails | null;

        /**
         * Hash containing timestamps of when the object transitioned to a particular status.
         */
        status_transitions: OutboundTransfer.StatusTransitions | null;

        /**
         * To which outbound destination the OutboundTransfer was sent.
         */
        to: OutboundTransfer.To;
      }

      namespace OutboundTransfer {
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
           * Timestamp describing when an OutboundTransfer changed status to `canceled`.
           * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
           */
          canceled_at: string | null;

          /**
           * Timestamp describing when an OutboundTransfer changed status to `failed`.
           * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
           */
          failed_at: string | null;

          /**
           * Timestamp describing when an OutboundTransfer changed status to `posted`.
           * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
           */
          posted_at: string | null;

          /**
           * Timestamp describing when an OutboundTransfer changed status to `returned`.
           * Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
           */
          returned_at: string | null;
        }

        interface To {
          /**
           * The outbound destination to which an OutboundTransfer is sent.
           */
          destination: string;
        }
      }
    }
  }
}
