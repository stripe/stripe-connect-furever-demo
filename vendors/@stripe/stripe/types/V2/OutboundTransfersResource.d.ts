// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      interface OutboundTransferCreateParams {
        /**
         * The FinancialAccount to pull funds from.
         */
        from: OutboundTransferCreateParams.From;

        /**
         * Details about the OutboundTransfer, including source and destination amount, and foreign exchange details.
         */
        money_movement_amounts: OutboundTransferCreateParams.MoneyMovementAmounts;

        /**
         * To which outbound destination to send the OutboundTransfer.
         */
        to: OutboundTransferCreateParams.To;

        /**
         * An arbitrary string attached to the OutboundTransfer. Often useful for displaying to users.
         */
        description?: string;

        /**
         * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
         */
        metadata?: Stripe.MetadataParam;

        /**
         * Method to be used to send the OutboundTransfer.
         */
        method?: OutboundTransferCreateParams.Method;
      }

      namespace OutboundTransferCreateParams {
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

        interface To {
          /**
           * The outbound destination to which an OutboundTransfer is sent.
           */
          destination: string;
        }
      }

      interface OutboundTransferRetrieveParams {}

      interface OutboundTransferListParams {
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
         * Closed Enum. Only return OutboundTransfers with this status.
         */
        status?: Array<OutboundTransferListParams.Status>;
      }

      namespace OutboundTransferListParams {
        type Status =
          | 'canceled'
          | 'failed'
          | 'posted'
          | 'processing'
          | 'returned';
      }

      interface OutboundTransferCancelParams {}

      class OutboundTransfersResource {
        /**
         * Creates an OutboundTransfer.
         * @throws Stripe.InsufficientFundsError
         */
        create(
          params: OutboundTransferCreateParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.OutboundTransfer>>;

        /**
         * Retrieves the details of an existing OutboundTransfer by passing the unique OutboundTransfer ID from either the OutboundPayment create or list response.
         */
        retrieve(
          id: string,
          params?: OutboundTransferRetrieveParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.OutboundTransfer>>;
        retrieve(
          id: string,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.OutboundTransfer>>;

        /**
         * Returns a list of OutboundTransfers that match the provided filters.
         */
        list(
          params?: OutboundTransferListParams,
          options?: RequestOptions
        ): ApiListPromise<Stripe.V2.OutboundTransfer>;
        list(
          options?: RequestOptions
        ): ApiListPromise<Stripe.V2.OutboundTransfer>;

        /**
         * Cancels an OutboundTransfer. Only processing OutboundTransfers can be canceled.
         * @throws Stripe.AlreadyCanceledError
         * @throws Stripe.NotCancelableError
         */
        cancel(
          id: string,
          params?: OutboundTransferCancelParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.OutboundTransfer>>;
        cancel(
          id: string,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.V2.OutboundTransfer>>;
      }
    }
  }
}
