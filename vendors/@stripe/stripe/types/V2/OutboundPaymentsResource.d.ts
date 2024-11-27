// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      interface OutboundPaymentCreateParams {
        /**
         * From which FinancialAccount and BalanceType to pull funds from.
         */
        from: OutboundPaymentCreateParams.From;

        /**
         * Details about the OutboundPayment amounts, including source and destination amounts, and foreign exchange details.
         */
        money_movement_amounts: OutboundPaymentCreateParams.MoneyMovementAmounts;

        /**
         * To which outbound destination to send the OutboundPayment.
         */
        to: OutboundPaymentCreateParams.To;

        /**
         * An arbitrary string attached to the OutboundPayment. Often useful for displaying to users.
         */
        description?: string;

        /**
         * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
         */
        metadata?: Stripe.MetadataParam;

        /**
         * Method to be used to send the OutboundPayment.
         */
        method?: OutboundPaymentCreateParams.Method;

        /**
         * Details about the notification settings for the OutboundPayment recipient.
         */
        recipient_notification?: OutboundPaymentCreateParams.RecipientNotification;
      }

      namespace OutboundPaymentCreateParams {
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
          bank_account?: Method.BankAccount;

          /**
           * Open Enum. Method for card destination.
           */
          card?: 'automatic';
        }

        namespace Method {
          type BankAccount = 'automatic' | 'local' | 'wire';
        }

        interface MoneyMovementAmounts {
          /**
           * Monetary amount sent to destination.
           */
          destination?: Amount;

          /**
           * Monetary amount sent from source financial account.
           */
          source?: Amount;
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

        interface To {
          /**
           * The outbound destination to which an OutboundPayment is sent.
           */
          destination?: string;

          /**
           * To which account the OutboundPayment is sent.
           */
          recipient: string;
        }
      }

      interface OutboundPaymentRetrieveParams {}

      interface OutboundPaymentListParams {
        /**
         * Filter for objects created at the specified timestamp.
         * Must be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.
         */
        created?: string;

        /**
         * Filter for objects created after the specified timestamp.
         * Must be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.
         */
        created_gt?: string;

        /**
         * Filter for objects created on or after the specified timestamp.
         * Must be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.
         */
        created_gte?: string;

        /**
         * Filter for objects created before the specified timestamp.
         * Must be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.
         */
        created_lt?: string;

        /**
         * Filter for objects created on or before the specified timestamp.
         * Must be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.
         */
        created_lte?: string;

        /**
         * The maximum number of results to return.
         */
        limit?: number;

        /**
         * The page token to use to retrieve the page being requested.
         */
        page?: string;

        /**
         * Only return OutboundPayments sent to this recipient.
         */
        recipient?: string;

        /**
         * Closed Enum. Only return OutboundPayments with this status.
         */
        status?: Array<OutboundPaymentListParams.Status>;
      }

      namespace OutboundPaymentListParams {
        type Status =
          | 'canceled'
          | 'failed'
          | 'posted'
          | 'processing'
          | 'returned';
      }

      interface OutboundPaymentCancelParams {}

      class OutboundPaymentsResource {
        /**
         * Creates an OutboundPayment.
         * @throws Stripe.InsufficientFundsError
         * @throws Stripe.QuotaExceededError
         * @throws Stripe.RecipientNotNotifiableError
         * @throws Stripe.FeatureNotEnabledError
         */
        create(
          params: OutboundPaymentCreateParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.OutboundPayment>>;

        /**
         * Retrieves the details of an existing OutboundPayment by passing the unique OutboundPayment ID from either the OutboundPayment create or list response.
         */
        retrieve(
          id: string,
          params?: OutboundPaymentRetrieveParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.OutboundPayment>>;
        retrieve(
          id: string,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.OutboundPayment>>;

        /**
         * Returns a list of OutboundPayments that match the provided filters.
         */
        list(
          params?: OutboundPaymentListParams,
          options?: RequestOptions
        ): ApiListPromise<Stripe.V2.OutboundPayment>;
        list(
          options?: RequestOptions
        ): ApiListPromise<Stripe.V2.OutboundPayment>;

        /**
         * Cancels an OutboundPayment. Only processing OutboundPayments can be canceled.
         * @throws Stripe.AlreadyCanceledError
         * @throws Stripe.NotCancelableError
         */
        cancel(
          id: string,
          params?: OutboundPaymentCancelParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.OutboundPayment>>;
        cancel(
          id: string,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.OutboundPayment>>;
      }
    }
  }
}
