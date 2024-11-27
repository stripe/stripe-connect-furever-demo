// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe.V2 {
    export type Event =
      | Stripe.Events.V2CoreAccountRequirementsUpdatedEvent
      | Stripe.Events.V2CoreAccountConfigurationCustomerFeatureStatusUpdatedEvent
      | Stripe.Events.V2CoreAccountConfigurationMerchantFeatureStatusUpdatedEvent
      | Stripe.Events.V2CoreAccountConfigurationRecipientFeatureStatusUpdatedEvent
      | Stripe.Events.V1BillingMeterErrorReportTriggeredEvent
      | Stripe.Events.V1BillingMeterNoMeterFoundEvent
      | Stripe.Events.AccountConfigurationRecipientDataAccountLinkCompletedEvent
      | Stripe.Events.AccountConfigurationRecipientDataFeatureStatusUpdatedEvent
      | Stripe.Events.AccountRequirementsUpdatedEvent
      | Stripe.Events.FinancialAccountCreatedEvent
      | Stripe.Events.FinancialAddressActivatedEvent
      | Stripe.Events.FinancialAddressFailedEvent
      | Stripe.Events.InboundTransferBankDebitSucceededEvent
      | Stripe.Events.OutboundPaymentCanceledEvent
      | Stripe.Events.OutboundPaymentCreatedEvent
      | Stripe.Events.OutboundPaymentFailedEvent
      | Stripe.Events.OutboundPaymentPostedEvent
      | Stripe.Events.OutboundPaymentReturnedEvent
      | Stripe.Events.OutboundTransferCanceledEvent
      | Stripe.Events.OutboundTransferCreatedEvent
      | Stripe.Events.OutboundTransferFailedEvent
      | Stripe.Events.OutboundTransferPostedEvent
      | Stripe.Events.OutboundTransferReturnedEvent
      | Stripe.Events.V2BillingBillableItemCreatedEvent
      | Stripe.Events.V2BillingBillableItemUpdatedEvent
      | Stripe.Events.V2BillingCadenceCreatedEvent
      | Stripe.Events.V2BillingRateCardCreatedEvent
      | Stripe.Events.V2BillingRateCardUpdatedEvent
      | Stripe.Events.V2BillingRateCardRateCreatedEvent
      | Stripe.Events.V2BillingRateCardSubscriptionActivatedEvent
      | Stripe.Events.V2BillingRateCardSubscriptionCanceledEvent
      | Stripe.Events.ReceivedCreditAvailableEvent
      | Stripe.Events.ReceivedCreditFailedEvent
      | Stripe.Events.ReceivedCreditReturnedEvent
      | Stripe.Events.ReceivedCreditSucceededEvent;

    export type PushedEvent =
      | Stripe.Events.PushedV2CoreAccountRequirementsUpdatedEvent
      | Stripe.Events.PushedV2CoreAccountConfigurationCustomerFeatureStatusUpdatedEvent
      | Stripe.Events.PushedV2CoreAccountConfigurationMerchantFeatureStatusUpdatedEvent
      | Stripe.Events.PushedV2CoreAccountConfigurationRecipientFeatureStatusUpdatedEvent
      | Stripe.Events.PushedV1BillingMeterErrorReportTriggeredEvent
      | Stripe.Events.PushedV1BillingMeterNoMeterFoundEvent
      | Stripe.Events.PushedAccountConfigurationRecipientDataAccountLinkCompletedEvent
      | Stripe.Events.PushedAccountConfigurationRecipientDataFeatureStatusUpdatedEvent
      | Stripe.Events.PushedAccountRequirementsUpdatedEvent
      | Stripe.Events.PushedFinancialAccountCreatedEvent
      | Stripe.Events.PushedFinancialAddressActivatedEvent
      | Stripe.Events.PushedFinancialAddressFailedEvent
      | Stripe.Events.PushedInboundTransferBankDebitSucceededEvent
      | Stripe.Events.PushedOutboundPaymentCanceledEvent
      | Stripe.Events.PushedOutboundPaymentCreatedEvent
      | Stripe.Events.PushedOutboundPaymentFailedEvent
      | Stripe.Events.PushedOutboundPaymentPostedEvent
      | Stripe.Events.PushedOutboundPaymentReturnedEvent
      | Stripe.Events.PushedOutboundTransferCanceledEvent
      | Stripe.Events.PushedOutboundTransferCreatedEvent
      | Stripe.Events.PushedOutboundTransferFailedEvent
      | Stripe.Events.PushedOutboundTransferPostedEvent
      | Stripe.Events.PushedOutboundTransferReturnedEvent
      | Stripe.Events.PushedV2BillingBillableItemCreatedEvent
      | Stripe.Events.PushedV2BillingBillableItemUpdatedEvent
      | Stripe.Events.PushedV2BillingCadenceCreatedEvent
      | Stripe.Events.PushedV2BillingRateCardCreatedEvent
      | Stripe.Events.PushedV2BillingRateCardUpdatedEvent
      | Stripe.Events.PushedV2BillingRateCardRateCreatedEvent
      | Stripe.Events.PushedV2BillingRateCardSubscriptionActivatedEvent
      | Stripe.Events.PushedV2BillingRateCardSubscriptionCanceledEvent
      | Stripe.Events.PushedReceivedCreditAvailableEvent
      | Stripe.Events.PushedReceivedCreditFailedEvent
      | Stripe.Events.PushedReceivedCreditReturnedEvent
      | Stripe.Events.PushedReceivedCreditSucceededEvent;
  }

  namespace Stripe.Events {
    /**
     * This event occurs when the account's requirements are updated.
     */
    export interface V2CoreAccountRequirementsUpdatedEvent
      extends V2.EventBase {
      type: 'v2.core.account.requirements.updated';
    }
    export interface PushedV2CoreAccountRequirementsUpdatedEvent
      extends V2.EventBase {
      type: 'v2.core.account.requirements.updated';
      pull(): Promise<V2CoreAccountRequirementsUpdatedEvent>;
    }

    /**
     * The status of a customer config feature was updated.
     */
    export interface V2CoreAccountConfigurationCustomerFeatureStatusUpdatedEvent
      extends V2.EventBase {
      type: 'v2.core.account.configuration.customer.feature_status_updated';
      // Retrieves data specific to this event.
      data: V2CoreAccountConfigurationCustomerFeatureStatusUpdatedEvent.Data;
    }
    export interface PushedV2CoreAccountConfigurationCustomerFeatureStatusUpdatedEvent
      extends V2.EventBase {
      type: 'v2.core.account.configuration.customer.feature_status_updated';
      pull(): Promise<
        V2CoreAccountConfigurationCustomerFeatureStatusUpdatedEvent
      >;
    }

    namespace V2CoreAccountConfigurationCustomerFeatureStatusUpdatedEvent {
      export interface Data {
        /**
         * Closed Enum. The feature which had its status updated.
         */
        feature_name: 'automatic_indirect_tax';
      }
    }

    /**
     * The status of a merchant config feature was updated.
     */
    export interface V2CoreAccountConfigurationMerchantFeatureStatusUpdatedEvent
      extends V2.EventBase {
      type: 'v2.core.account.configuration.merchant.feature_status_updated';
      // Retrieves data specific to this event.
      data: V2CoreAccountConfigurationMerchantFeatureStatusUpdatedEvent.Data;
    }
    export interface PushedV2CoreAccountConfigurationMerchantFeatureStatusUpdatedEvent
      extends V2.EventBase {
      type: 'v2.core.account.configuration.merchant.feature_status_updated';
      pull(): Promise<
        V2CoreAccountConfigurationMerchantFeatureStatusUpdatedEvent
      >;
    }

    namespace V2CoreAccountConfigurationMerchantFeatureStatusUpdatedEvent {
      export interface Data {
        /**
         * Closed Enum. The merchant_config feature which had its status updated.
         */
        feature_name: 'card_payments';
      }
    }

    /**
     * The status of a recipient config feature was updated.
     */
    export interface V2CoreAccountConfigurationRecipientFeatureStatusUpdatedEvent
      extends V2.EventBase {
      type: 'v2.core.account.configuration.recipient.feature_status_updated';
      // Retrieves data specific to this event.
      data: V2CoreAccountConfigurationRecipientFeatureStatusUpdatedEvent.Data;
    }
    export interface PushedV2CoreAccountConfigurationRecipientFeatureStatusUpdatedEvent
      extends V2.EventBase {
      type: 'v2.core.account.configuration.recipient.feature_status_updated';
      pull(): Promise<
        V2CoreAccountConfigurationRecipientFeatureStatusUpdatedEvent
      >;
    }

    namespace V2CoreAccountConfigurationRecipientFeatureStatusUpdatedEvent {
      export interface Data {
        /**
         * Closed Enum. The feature which had its status updated.
         */
        feature_name: 'stripe.transfers';
      }
    }

    /**
     * This event occurs when there are invalid async usage events for a given meter.
     */
    export interface V1BillingMeterErrorReportTriggeredEvent
      extends V2.EventBase {
      type: 'v1.billing.meter.error_report_triggered';
      // Retrieves data specific to this event.
      data: V1BillingMeterErrorReportTriggeredEvent.Data;
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<Billing.Meter>;
    }
    export interface PushedV1BillingMeterErrorReportTriggeredEvent
      extends V2.EventBase {
      type: 'v1.billing.meter.error_report_triggered';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<Billing.Meter>;
      pull(): Promise<V1BillingMeterErrorReportTriggeredEvent>;
    }

    namespace V1BillingMeterErrorReportTriggeredEvent {
      export interface Data {
        /**
         * Extra field included in the event's `data` when fetched from /v2/events.
         */
        developer_message_summary: string;

        /**
         * This contains information about why meter error happens.
         */
        reason: Data.Reason;

        /**
         * The end of the window that is encapsulated by this summary.
         */
        validation_end: string;

        /**
         * The start of the window that is encapsulated by this summary.
         */
        validation_start: string;
      }

      namespace Data {
        export interface Reason {
          /**
           * The total error count within this window.
           */
          error_count: number;

          /**
           * The error details.
           */
          error_types: Array<Reason.ErrorType>;
        }

        namespace Reason {
          export interface ErrorType {
            /**
             * Open Enum.
             */
            code: ErrorType.Code;

            /**
             * The number of errors of this type.
             */
            error_count: number;

            /**
             * A list of sample errors of this type.
             */
            sample_errors: Array<ErrorType.SampleError>;
          }

          namespace ErrorType {
            export type Code =
              | 'archived_meter'
              | 'meter_event_customer_not_found'
              | 'meter_event_dimension_count_too_high'
              | 'meter_event_invalid_value'
              | 'meter_event_no_customer_defined'
              | 'missing_dimension_payload_keys'
              | 'no_meter'
              | 'timestamp_in_future'
              | 'timestamp_too_far_in_past';

            export interface SampleError {
              /**
               * The error message.
               */
              error_message: string;

              /**
               * The request causes the error.
               */
              request: SampleError.Request;
            }

            namespace SampleError {
              export interface Request {
                /**
                 * The request idempotency key.
                 */
                identifier: string;
              }
            }
          }
        }
      }
    }

    /**
     * This event occurs when async usage events have missing or invalid meter ids.
     */
    export interface V1BillingMeterNoMeterFoundEvent extends V2.EventBase {
      type: 'v1.billing.meter.no_meter_found';
      // Retrieves data specific to this event.
      data: V1BillingMeterNoMeterFoundEvent.Data;
    }
    export interface PushedV1BillingMeterNoMeterFoundEvent
      extends V2.EventBase {
      type: 'v1.billing.meter.no_meter_found';
      pull(): Promise<V1BillingMeterNoMeterFoundEvent>;
    }

    namespace V1BillingMeterNoMeterFoundEvent {
      export interface Data {
        /**
         * Extra field included in the event's `data` when fetched from /v2/events.
         */
        developer_message_summary: string;

        /**
         * This contains information about why meter error happens.
         */
        reason: Data.Reason;

        /**
         * The end of the window that is encapsulated by this summary.
         */
        validation_end: string;

        /**
         * The start of the window that is encapsulated by this summary.
         */
        validation_start: string;
      }

      namespace Data {
        export interface Reason {
          /**
           * The total error count within this window.
           */
          error_count: number;

          /**
           * The error details.
           */
          error_types: Array<Reason.ErrorType>;
        }

        namespace Reason {
          export interface ErrorType {
            /**
             * Open Enum.
             */
            code: ErrorType.Code;

            /**
             * The number of errors of this type.
             */
            error_count: number;

            /**
             * A list of sample errors of this type.
             */
            sample_errors: Array<ErrorType.SampleError>;
          }

          namespace ErrorType {
            export type Code =
              | 'archived_meter'
              | 'meter_event_customer_not_found'
              | 'meter_event_dimension_count_too_high'
              | 'meter_event_invalid_value'
              | 'meter_event_no_customer_defined'
              | 'missing_dimension_payload_keys'
              | 'no_meter'
              | 'timestamp_in_future'
              | 'timestamp_too_far_in_past';

            export interface SampleError {
              /**
               * The error message.
               */
              error_message: string;

              /**
               * The request causes the error.
               */
              request: SampleError.Request;
            }

            namespace SampleError {
              export interface Request {
                /**
                 * The request idempotency key.
                 */
                identifier: string;
              }
            }
          }
        }
      }
    }

    /**
     * The account link generated for a recipient has been completed.
     */
    export interface AccountConfigurationRecipientDataAccountLinkCompletedEvent
      extends V2.EventBase {
      type: 'account.configuration_recipient_data.account_link_completed';
      // Retrieves data specific to this event.
      data: AccountConfigurationRecipientDataAccountLinkCompletedEvent.Data;
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Account>;
    }
    export interface PushedAccountConfigurationRecipientDataAccountLinkCompletedEvent
      extends V2.EventBase {
      type: 'account.configuration_recipient_data.account_link_completed';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Account>;
      pull(): Promise<
        AccountConfigurationRecipientDataAccountLinkCompletedEvent
      >;
    }

    namespace AccountConfigurationRecipientDataAccountLinkCompletedEvent {
      export interface Data {
        /**
         * Closed Enum. The use case type of the account link that has been completed.
         */
        use_case: Data.UseCase;
      }

      namespace Data {
        export type UseCase = 'account_onboarding' | 'account_update';
      }
    }

    /**
     * The status of a feature on the recipient_data was updated.
     */
    export interface AccountConfigurationRecipientDataFeatureStatusUpdatedEvent
      extends V2.EventBase {
      type: 'account.configuration_recipient_data.feature_status_updated';
      // Retrieves data specific to this event.
      data: AccountConfigurationRecipientDataFeatureStatusUpdatedEvent.Data;
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Account>;
    }
    export interface PushedAccountConfigurationRecipientDataFeatureStatusUpdatedEvent
      extends V2.EventBase {
      type: 'account.configuration_recipient_data.feature_status_updated';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Account>;
      pull(): Promise<
        AccountConfigurationRecipientDataFeatureStatusUpdatedEvent
      >;
    }

    namespace AccountConfigurationRecipientDataFeatureStatusUpdatedEvent {
      export interface Data {
        /**
         * Closed Enum. The recipient_data feature which had its status updated.
         */
        feature_name: Data.FeatureName;
      }

      namespace Data {
        export type FeatureName =
          | 'bank_accounts.local'
          | 'bank_accounts.wire'
          | 'cards';
      }
    }

    /**
     * The requirements associated with a v2 account are updated.
     */
    export interface AccountRequirementsUpdatedEvent extends V2.EventBase {
      type: 'account.requirements.updated';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Account>;
    }
    export interface PushedAccountRequirementsUpdatedEvent
      extends V2.EventBase {
      type: 'account.requirements.updated';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Account>;
      pull(): Promise<AccountRequirementsUpdatedEvent>;
    }

    /**
     * Occurs when a financial account is created.
     */
    export interface FinancialAccountCreatedEvent extends V2.EventBase {
      type: 'financial_account.created';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.FinancialAccount>;
    }
    export interface PushedFinancialAccountCreatedEvent extends V2.EventBase {
      type: 'financial_account.created';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.FinancialAccount>;
      pull(): Promise<FinancialAccountCreatedEvent>;
    }

    /**
     * The FinancialAddress is now active and ready to receive funds using the credentials provided.
     */
    export interface FinancialAddressActivatedEvent extends V2.EventBase {
      type: 'financial_address.activated';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.FinancialAddress>;
    }
    export interface PushedFinancialAddressActivatedEvent extends V2.EventBase {
      type: 'financial_address.activated';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.FinancialAddress>;
      pull(): Promise<FinancialAddressActivatedEvent>;
    }

    /**
     * The FinancialAddress could not be activated and can not receive funds.
     */
    export interface FinancialAddressFailedEvent extends V2.EventBase {
      type: 'financial_address.failed';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.FinancialAddress>;
    }
    export interface PushedFinancialAddressFailedEvent extends V2.EventBase {
      type: 'financial_address.failed';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.FinancialAddress>;
      pull(): Promise<FinancialAddressFailedEvent>;
    }

    /**
     * An InboundTransfer succeeded.
     */
    export interface InboundTransferBankDebitSucceededEvent
      extends V2.EventBase {
      type: 'inbound_transfer.bank_debit_succeeded';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.InboundTransfer>;
    }
    export interface PushedInboundTransferBankDebitSucceededEvent
      extends V2.EventBase {
      type: 'inbound_transfer.bank_debit_succeeded';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.InboundTransfer>;
      pull(): Promise<InboundTransferBankDebitSucceededEvent>;
    }

    /**
     * An OutboundPayment has transitioned into the canceled state.
     */
    export interface OutboundPaymentCanceledEvent extends V2.EventBase {
      type: 'outbound_payment.canceled';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundPayment>;
    }
    export interface PushedOutboundPaymentCanceledEvent extends V2.EventBase {
      type: 'outbound_payment.canceled';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundPayment>;
      pull(): Promise<OutboundPaymentCanceledEvent>;
    }

    /**
     * A new OutboundPayment has been created.
     */
    export interface OutboundPaymentCreatedEvent extends V2.EventBase {
      type: 'outbound_payment.created';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundPayment>;
    }
    export interface PushedOutboundPaymentCreatedEvent extends V2.EventBase {
      type: 'outbound_payment.created';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundPayment>;
      pull(): Promise<OutboundPaymentCreatedEvent>;
    }

    /**
     * An OutboundPayment has transitioned into the failed state.
     */
    export interface OutboundPaymentFailedEvent extends V2.EventBase {
      type: 'outbound_payment.failed';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundPayment>;
    }
    export interface PushedOutboundPaymentFailedEvent extends V2.EventBase {
      type: 'outbound_payment.failed';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundPayment>;
      pull(): Promise<OutboundPaymentFailedEvent>;
    }

    /**
     * An OutboundPayment has transitioned into the posted state.
     */
    export interface OutboundPaymentPostedEvent extends V2.EventBase {
      type: 'outbound_payment.posted';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundPayment>;
    }
    export interface PushedOutboundPaymentPostedEvent extends V2.EventBase {
      type: 'outbound_payment.posted';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundPayment>;
      pull(): Promise<OutboundPaymentPostedEvent>;
    }

    /**
     * An OutboundPayment has transitioned into the returned state.
     */
    export interface OutboundPaymentReturnedEvent extends V2.EventBase {
      type: 'outbound_payment.returned';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundPayment>;
    }
    export interface PushedOutboundPaymentReturnedEvent extends V2.EventBase {
      type: 'outbound_payment.returned';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundPayment>;
      pull(): Promise<OutboundPaymentReturnedEvent>;
    }

    /**
     * An OutboundTransfer has transitioned into the canceled state.
     */
    export interface OutboundTransferCanceledEvent extends V2.EventBase {
      type: 'outbound_transfer.canceled';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundTransfer>;
    }
    export interface PushedOutboundTransferCanceledEvent extends V2.EventBase {
      type: 'outbound_transfer.canceled';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundTransfer>;
      pull(): Promise<OutboundTransferCanceledEvent>;
    }

    /**
     * A new OutboundTransfer has been created.
     */
    export interface OutboundTransferCreatedEvent extends V2.EventBase {
      type: 'outbound_transfer.created';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundTransfer>;
    }
    export interface PushedOutboundTransferCreatedEvent extends V2.EventBase {
      type: 'outbound_transfer.created';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundTransfer>;
      pull(): Promise<OutboundTransferCreatedEvent>;
    }

    /**
     * An OutboundTransfer has transitioned into the failed state.
     */
    export interface OutboundTransferFailedEvent extends V2.EventBase {
      type: 'outbound_transfer.failed';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundTransfer>;
    }
    export interface PushedOutboundTransferFailedEvent extends V2.EventBase {
      type: 'outbound_transfer.failed';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundTransfer>;
      pull(): Promise<OutboundTransferFailedEvent>;
    }

    /**
     * An OutboundTransfer has transitioned into the posted state.
     */
    export interface OutboundTransferPostedEvent extends V2.EventBase {
      type: 'outbound_transfer.posted';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundTransfer>;
    }
    export interface PushedOutboundTransferPostedEvent extends V2.EventBase {
      type: 'outbound_transfer.posted';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundTransfer>;
      pull(): Promise<OutboundTransferPostedEvent>;
    }

    /**
     * An OutboundTransfer has transitioned into the returned state.
     */
    export interface OutboundTransferReturnedEvent extends V2.EventBase {
      type: 'outbound_transfer.returned';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundTransfer>;
    }
    export interface PushedOutboundTransferReturnedEvent extends V2.EventBase {
      type: 'outbound_transfer.returned';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.OutboundTransfer>;
      pull(): Promise<OutboundTransferReturnedEvent>;
    }

    /**
     * This event occurs when a BillableItem is created.
     */
    export interface V2BillingBillableItemCreatedEvent extends V2.EventBase {
      type: 'v2.billing.billable_item.created';
      // Retrieves data specific to this event.
      data: V2BillingBillableItemCreatedEvent.Data;
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.BillableItem>;
    }
    export interface PushedV2BillingBillableItemCreatedEvent
      extends V2.EventBase {
      type: 'v2.billing.billable_item.created';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.BillableItem>;
      pull(): Promise<V2BillingBillableItemCreatedEvent>;
    }

    namespace V2BillingBillableItemCreatedEvent {
      export interface Data {
        /**
         * Timestamp of when the object was created.
         */
        created: string;

        /**
         * The description that customers will see in the invoice line item.
         */
        display_name: string;
      }
    }

    /**
     * This event occurs when a BillableItem is updated.
     */
    export interface V2BillingBillableItemUpdatedEvent extends V2.EventBase {
      type: 'v2.billing.billable_item.updated';
      // Retrieves data specific to this event.
      data: V2BillingBillableItemUpdatedEvent.Data;
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.BillableItem>;
    }
    export interface PushedV2BillingBillableItemUpdatedEvent
      extends V2.EventBase {
      type: 'v2.billing.billable_item.updated';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.BillableItem>;
      pull(): Promise<V2BillingBillableItemUpdatedEvent>;
    }

    namespace V2BillingBillableItemUpdatedEvent {
      export interface Data {
        /**
         * The description that customers will see in the invoice line item.
         */
        display_name: string;
      }
    }

    /**
     * This event occurs when a billing Cadence is created.
     */
    export interface V2BillingCadenceCreatedEvent extends V2.EventBase {
      type: 'v2.billing.cadence.created';
      // Retrieves data specific to this event.
      data: V2BillingCadenceCreatedEvent.Data;
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.Cadence>;
    }
    export interface PushedV2BillingCadenceCreatedEvent extends V2.EventBase {
      type: 'v2.billing.cadence.created';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.Cadence>;
      pull(): Promise<V2BillingCadenceCreatedEvent>;
    }

    namespace V2BillingCadenceCreatedEvent {
      export interface Data {
        /**
         * Timestamp of when the object was created.
         */
        created: string;
      }
    }

    /**
     * This event occurs when a RateCard is created.
     */
    export interface V2BillingRateCardCreatedEvent extends V2.EventBase {
      type: 'v2.billing.rate_card.created';
      // Retrieves data specific to this event.
      data: V2BillingRateCardCreatedEvent.Data;
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.RateCard>;
    }
    export interface PushedV2BillingRateCardCreatedEvent extends V2.EventBase {
      type: 'v2.billing.rate_card.created';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.RateCard>;
      pull(): Promise<V2BillingRateCardCreatedEvent>;
    }

    namespace V2BillingRateCardCreatedEvent {
      export interface Data {
        /**
         * Timestamp of when the object was created.
         */
        created: string;
      }
    }

    /**
     * This event occurs when a RateCard is updated.
     */
    export interface V2BillingRateCardUpdatedEvent extends V2.EventBase {
      type: 'v2.billing.rate_card.updated';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.RateCard>;
    }
    export interface PushedV2BillingRateCardUpdatedEvent extends V2.EventBase {
      type: 'v2.billing.rate_card.updated';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.RateCard>;
      pull(): Promise<V2BillingRateCardUpdatedEvent>;
    }

    /**
     * This event occurs when a RateCard Rate is created.
     */
    export interface V2BillingRateCardRateCreatedEvent extends V2.EventBase {
      type: 'v2.billing.rate_card_rate.created';
      // Retrieves data specific to this event.
      data: V2BillingRateCardRateCreatedEvent.Data;
    }
    export interface PushedV2BillingRateCardRateCreatedEvent
      extends V2.EventBase {
      type: 'v2.billing.rate_card_rate.created';
      pull(): Promise<V2BillingRateCardRateCreatedEvent>;
    }

    namespace V2BillingRateCardRateCreatedEvent {
      export interface Data {
        /**
         * The ID of the BillableItem which this Rate is associated with.
         */
        billable_item: string;

        /**
         * Timestamp of when the object was created.
         */
        created: string;

        /**
         * The ID of the RateCard which this Rate belongs to.
         */
        rate_card: string;

        /**
         * The ID of the latest RateCard Version when the Rate was created.
         */
        rate_card_version: string;
      }
    }

    /**
     * This event occurs when a RateCardSubscription is activated.
     */
    export interface V2BillingRateCardSubscriptionActivatedEvent
      extends V2.EventBase {
      type: 'v2.billing.rate_card_subscription.activated';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.RateCardSubscription>;
    }
    export interface PushedV2BillingRateCardSubscriptionActivatedEvent
      extends V2.EventBase {
      type: 'v2.billing.rate_card_subscription.activated';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.RateCardSubscription>;
      pull(): Promise<V2BillingRateCardSubscriptionActivatedEvent>;
    }

    /**
     * This event occurs when a RateCardSubscription is canceled.
     */
    export interface V2BillingRateCardSubscriptionCanceledEvent
      extends V2.EventBase {
      type: 'v2.billing.rate_card_subscription.canceled';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.RateCardSubscription>;
    }
    export interface PushedV2BillingRateCardSubscriptionCanceledEvent
      extends V2.EventBase {
      type: 'v2.billing.rate_card_subscription.canceled';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.Billing.RateCardSubscription>;
      pull(): Promise<V2BillingRateCardSubscriptionCanceledEvent>;
    }

    /**
     * The funds related to the received credit are available in your balance.
     */
    export interface ReceivedCreditAvailableEvent extends V2.EventBase {
      type: 'received_credit.available';
      // Retrieves data specific to this event.
      data: ReceivedCreditAvailableEvent.Data;
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.ReceivedCredit>;
    }
    export interface PushedReceivedCreditAvailableEvent extends V2.EventBase {
      type: 'received_credit.available';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.ReceivedCredit>;
      pull(): Promise<ReceivedCreditAvailableEvent>;
    }

    namespace ReceivedCreditAvailableEvent {
      export interface Data {
        /**
         * The transaction ID of the received credit.
         */
        transaction_id: string;
      }
    }

    /**
     * A credit was attempted to your balance and was not successful. See the status_details for more information.
     */
    export interface ReceivedCreditFailedEvent extends V2.EventBase {
      type: 'received_credit.failed';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.ReceivedCredit>;
    }
    export interface PushedReceivedCreditFailedEvent extends V2.EventBase {
      type: 'received_credit.failed';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.ReceivedCredit>;
      pull(): Promise<ReceivedCreditFailedEvent>;
    }

    /**
     * The previously received credit has been reversed, returned to the originator and deducted from your balance.
     */
    export interface ReceivedCreditReturnedEvent extends V2.EventBase {
      type: 'received_credit.returned';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.ReceivedCredit>;
    }
    export interface PushedReceivedCreditReturnedEvent extends V2.EventBase {
      type: 'received_credit.returned';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.ReceivedCredit>;
      pull(): Promise<ReceivedCreditReturnedEvent>;
    }

    /**
     * A credit was received successfully and processed by Stripe.
     */
    export interface ReceivedCreditSucceededEvent extends V2.EventBase {
      type: 'received_credit.succeeded';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.ReceivedCredit>;
    }
    export interface PushedReceivedCreditSucceededEvent extends V2.EventBase {
      type: 'received_credit.succeeded';
      // Object containing the reference to API resource relevant to the event.
      related_object: Event.RelatedObject;
      // Retrieves the object associated with the event.
      fetchRelatedObject(): Promise<V2.ReceivedCredit>;
      pull(): Promise<ReceivedCreditSucceededEvent>;
    }
  }
}
