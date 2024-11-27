// File generated from our OpenAPI spec

declare module '@stripe/stripe' {
  namespace Stripe {
    namespace V2 {
      namespace Core {
        /**
         * A V2 Account is a representation of a company or individual that a Stripe user does business with. Accounts contain the contact details, Legal Entity information, and configuration required to enable the Account for use across Stripe products.
         */
        interface Account {
          /**
           * Unique identifier for the Account.
           */
          id: string;

          /**
           * String representing the object's type. Objects of the same type share the same value of the object field.
           */
          object: 'v2.core.account';

          /**
           * Filter only accounts that have all of the configurations specified. If omitted, returns all accounts regardless of which configurations they have.
           */
          applied_configurations: Array<Account.AppliedConfiguration>;

          /**
           * An Account Configuration which allows the Account to take on a key persona across Stripe products.
           */
          configuration: Account.Configuration | null;

          /**
           * The default contact email address for the Account.
           */
          contact_email: string | null;

          /**
           * Time at which the object was created. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
           */
          created: string;

          /**
           * A value indicating the Stripe dashboard this Account has access to. This will depend on which configurations are enabled for this account.
           */
          dashboard: Account.Dashboard | null;

          /**
           * Default values to be used on Account Configurations.
           */
          defaults: Account.Defaults | null;

          /**
           * A descriptive name for the Account. This name will be surfaced in the Stripe Dashboard and on any invoices sent to the Account.
           */
          display_name: string | null;

          /**
           * Information about the company, individual, and business represented by the Account.
           */
          identity: Account.Identity | null;

          /**
           * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
           */
          metadata: Stripe.Metadata | null;

          /**
           * Information about the requirements for the Account, including what information needs to be collected, and by when.
           */
          requirements: Account.Requirements | null;
        }

        namespace Account {
          type AppliedConfiguration = 'customer' | 'merchant' | 'recipient';

          interface Configuration {
            /**
             * The Customer Configuration allows the Account to be used in inbound payment flows.
             */
            customer: Configuration.Customer | null;

            /**
             * The Merchant Configuration allows the Account to make charges.
             */
            merchant: Configuration.Merchant | null;

            /**
             * The Recipient Configuration allows the Account to receive funds.
             */
            recipient: Configuration.Recipient | null;
          }

          namespace Configuration {
            interface Customer {
              /**
               * Automatic indirect tax settings to be used when automatic tax calculation is enabled on the customer's invoices, subscriptions, checkout sessions, or payment links. Surfaces if automatic tax calculation is possible given the current customer location information.
               */
              automatic_indirect_tax: Customer.AutomaticIndirectTax | null;

              /**
               * Billing settings - default settings used for this customer in Billing flows such as Invoices and Subscriptions.
               */
              billing: Customer.Billing | null;

              /**
               * Features that have been requested on the Customer Configuration.
               */
              features: Customer.Features | null;

              /**
               * The customer's shipping information. Appears on invoices emailed to this customer.
               */
              shipping: Customer.Shipping | null;

              /**
               * ID of the test clock to attach to the customer. Can only be set on testmode Accounts, and when the Customer Configuration is first set on an Account.
               */
              test_clock: string | null;
            }

            namespace Customer {
              interface AutomaticIndirectTax {
                /**
                 * Describes the customer's tax exemption status, which is `none`, `exempt`, or `reverse`. When set to reverse, invoice and receipt PDFs include the following text: “Reverse charge”.
                 */
                exempt: AutomaticIndirectTax.Exempt | null;

                /**
                 * A recent IP address of the customer used for tax reporting and tax location inference.
                 */
                ip_address: string | null;

                /**
                 * The customer's location as identified by Stripe Tax - uses `location_source`. Will only be rendered if the `automatic_indirect_tax` feature is requested and `active`.
                 */
                location: AutomaticIndirectTax.Location | null;

                /**
                 * The data source used by Stripe Tax to identify the customer's location - defaults to 'identity_address'. Will only be used for automatic tax calculation on the customer's Invoices and Subscriptions.
                 */
                location_source: AutomaticIndirectTax.LocationSource | null;
              }

              namespace AutomaticIndirectTax {
                type Exempt = 'exempt' | 'none' | 'reverse';

                interface Location {
                  /**
                   * The customer's country as identified by Stripe Tax.
                   */
                  country: Location.Country | null;

                  /**
                   * The customer's state, county, province, or region as identified by Stripe Tax.
                   */
                  state: string | null;
                }

                namespace Location {
                  type Country =
                    | 'ad'
                    | 'ae'
                    | 'af'
                    | 'ag'
                    | 'ai'
                    | 'al'
                    | 'am'
                    | 'ao'
                    | 'aq'
                    | 'ar'
                    | 'as'
                    | 'at'
                    | 'au'
                    | 'aw'
                    | 'ax'
                    | 'az'
                    | 'ba'
                    | 'bb'
                    | 'bd'
                    | 'be'
                    | 'bf'
                    | 'bg'
                    | 'bh'
                    | 'bi'
                    | 'bj'
                    | 'bl'
                    | 'bm'
                    | 'bn'
                    | 'bo'
                    | 'bq'
                    | 'br'
                    | 'bs'
                    | 'bt'
                    | 'bv'
                    | 'bw'
                    | 'by'
                    | 'bz'
                    | 'ca'
                    | 'cc'
                    | 'cd'
                    | 'cf'
                    | 'cg'
                    | 'ch'
                    | 'ci'
                    | 'ck'
                    | 'cl'
                    | 'cm'
                    | 'cn'
                    | 'co'
                    | 'cr'
                    | 'cu'
                    | 'cv'
                    | 'cw'
                    | 'cx'
                    | 'cy'
                    | 'cz'
                    | 'de'
                    | 'dj'
                    | 'dk'
                    | 'dm'
                    | 'do'
                    | 'dz'
                    | 'ec'
                    | 'ee'
                    | 'eg'
                    | 'eh'
                    | 'er'
                    | 'es'
                    | 'et'
                    | 'fi'
                    | 'fj'
                    | 'fk'
                    | 'fm'
                    | 'fo'
                    | 'fr'
                    | 'ga'
                    | 'gb'
                    | 'gd'
                    | 'ge'
                    | 'gf'
                    | 'gg'
                    | 'gh'
                    | 'gi'
                    | 'gl'
                    | 'gm'
                    | 'gn'
                    | 'gp'
                    | 'gq'
                    | 'gr'
                    | 'gs'
                    | 'gt'
                    | 'gu'
                    | 'gw'
                    | 'gy'
                    | 'hk'
                    | 'hm'
                    | 'hn'
                    | 'hr'
                    | 'ht'
                    | 'hu'
                    | 'id'
                    | 'ie'
                    | 'il'
                    | 'im'
                    | 'in'
                    | 'io'
                    | 'iq'
                    | 'ir'
                    | 'is'
                    | 'it'
                    | 'je'
                    | 'jm'
                    | 'jo'
                    | 'jp'
                    | 'ke'
                    | 'kg'
                    | 'kh'
                    | 'ki'
                    | 'km'
                    | 'kn'
                    | 'kp'
                    | 'kr'
                    | 'kw'
                    | 'ky'
                    | 'kz'
                    | 'la'
                    | 'lb'
                    | 'lc'
                    | 'li'
                    | 'lk'
                    | 'lr'
                    | 'ls'
                    | 'lt'
                    | 'lu'
                    | 'lv'
                    | 'ly'
                    | 'ma'
                    | 'mc'
                    | 'md'
                    | 'me'
                    | 'mf'
                    | 'mg'
                    | 'mh'
                    | 'mk'
                    | 'ml'
                    | 'mm'
                    | 'mn'
                    | 'mo'
                    | 'mp'
                    | 'mq'
                    | 'mr'
                    | 'ms'
                    | 'mt'
                    | 'mu'
                    | 'mv'
                    | 'mw'
                    | 'mx'
                    | 'my'
                    | 'mz'
                    | 'na'
                    | 'nc'
                    | 'ne'
                    | 'nf'
                    | 'ng'
                    | 'ni'
                    | 'nl'
                    | 'no'
                    | 'np'
                    | 'nr'
                    | 'nu'
                    | 'nz'
                    | 'om'
                    | 'pa'
                    | 'pe'
                    | 'pf'
                    | 'pg'
                    | 'ph'
                    | 'pk'
                    | 'pl'
                    | 'pm'
                    | 'pn'
                    | 'pr'
                    | 'ps'
                    | 'pt'
                    | 'pw'
                    | 'py'
                    | 'qa'
                    | 'qz'
                    | 're'
                    | 'ro'
                    | 'rs'
                    | 'ru'
                    | 'rw'
                    | 'sa'
                    | 'sb'
                    | 'sc'
                    | 'sd'
                    | 'se'
                    | 'sg'
                    | 'sh'
                    | 'si'
                    | 'sj'
                    | 'sk'
                    | 'sl'
                    | 'sm'
                    | 'sn'
                    | 'so'
                    | 'sr'
                    | 'ss'
                    | 'st'
                    | 'sv'
                    | 'sx'
                    | 'sy'
                    | 'sz'
                    | 'tc'
                    | 'td'
                    | 'tf'
                    | 'tg'
                    | 'th'
                    | 'tj'
                    | 'tk'
                    | 'tl'
                    | 'tm'
                    | 'tn'
                    | 'to'
                    | 'tr'
                    | 'tt'
                    | 'tv'
                    | 'tw'
                    | 'tz'
                    | 'ua'
                    | 'ug'
                    | 'um'
                    | 'us'
                    | 'uy'
                    | 'uz'
                    | 'va'
                    | 'vc'
                    | 've'
                    | 'vg'
                    | 'vi'
                    | 'vn'
                    | 'vu'
                    | 'wf'
                    | 'ws'
                    | 'ye'
                    | 'yt'
                    | 'za'
                    | 'zm'
                    | 'zw';
                }

                type LocationSource =
                  | 'identity_address'
                  | 'ip_address'
                  | 'shipping_address';
              }

              interface Billing {
                /**
                 * ID of a payment method that's attached to the customer, to be used as the customer's default payment method for invoices and subscriptions.
                 */
                default_payment_method: string | null;

                /**
                 * Default settings used on invoices for this customer.
                 */
                invoice: Billing.Invoice | null;
              }

              namespace Billing {
                interface Invoice {
                  /**
                   * The list of up to 4 default custom fields to be displayed on invoices for this customer. When updating, pass an empty string to remove previously-defined fields.
                   */
                  custom_fields: Array<Invoice.CustomField>;

                  /**
                   * Default footer to be displayed on invoices for this customer.
                   */
                  footer: string | null;

                  /**
                   * The sequence to be used on the customer's next invoice. Defaults to 1.
                   */
                  next_sequence: number | null;

                  /**
                   * The prefix for the customer used to generate unique invoice numbers. Must be 3–12 uppercase letters or numbers.
                   */
                  prefix: string | null;

                  /**
                   * Default options for invoice PDF rendering for this customer.
                   */
                  rendering: Invoice.Rendering | null;
                }

                namespace Invoice {
                  interface CustomField {
                    /**
                     * The name of the custom field. This may be up to 40 characters.
                     */
                    name: string;

                    /**
                     * The value of the custom field. This may be up to 140 characters. When updating, pass an empty string to remove previously-defined values.
                     */
                    value: string;
                  }

                  interface Rendering {
                    /**
                     * How line-item prices and amounts will be displayed with respect to tax on invoice PDFs. One of exclude_tax or include_inclusive_tax. include_inclusive_tax will include inclusive tax (and exclude exclusive tax) in invoice PDF amounts. exclude_tax will exclude all tax (inclusive and exclusive alike) from invoice PDF amounts.
                     */
                    amount_tax_display: Rendering.AmountTaxDisplay | null;

                    /**
                     * ID of the invoice rendering template to use for future invoices.
                     */
                    template: string | null;
                  }

                  namespace Rendering {
                    type AmountTaxDisplay =
                      | 'exclude_tax'
                      | 'include_inclusive_tax';
                  }
                }
              }

              interface Features {
                /**
                 * Generates requirements for enabling automatic indirect tax calculation on this customer's invoices or subscriptions. Recommended to request this feature if planning to enable automatic tax calculation on this customer's invoices or subscriptions. Uses the `location_source` field.
                 */
                automatic_indirect_tax: Features.AutomaticIndirectTax | null;
              }

              namespace Features {
                interface AutomaticIndirectTax {
                  /**
                   * Whether the Feature has been requested.
                   */
                  requested: boolean;

                  /**
                   * The status of the Feature.
                   */
                  status: AutomaticIndirectTax.Status;

                  /**
                   * Additional details regarding the status of the Feature. `status_details` will be empty if the Feature's status is `active`.
                   */
                  status_details: Array<AutomaticIndirectTax.StatusDetail>;
                }

                namespace AutomaticIndirectTax {
                  type Status =
                    | 'active'
                    | 'pending'
                    | 'restricted'
                    | 'unsupported';

                  interface StatusDetail {
                    /**
                     * Machine-readable code explaining the reason for the Feature to be in its current status.
                     */
                    code: StatusDetail.Code;

                    /**
                     * Machine-readable code explaining how to make the Feature active.
                     */
                    resolution: StatusDetail.Resolution;
                  }

                  namespace StatusDetail {
                    type Code =
                      | 'determining_status'
                      | 'requirements_past_due'
                      | 'requirements_pending_verification'
                      | 'restricted_other'
                      | 'unsupported_country';

                    type Resolution =
                      | 'contact_stripe'
                      | 'no_resolution'
                      | 'provide_info';
                  }
                }
              }

              interface Shipping {
                /**
                 * Customer shipping address.
                 */
                address: Stripe.Address | null;

                /**
                 * Customer name.
                 */
                name: string | null;

                /**
                 * Customer phone (including extension).
                 */
                phone: string | null;
              }
            }

            interface Merchant {
              /**
               * Settings used to apply the merchant's branding to email receipts, invoices, Checkout, and other products.
               */
              branding: Merchant.Branding | null;

              /**
               * Card payments settings.
               */
              card_payments: Merchant.CardPayments | null;

              /**
               * Features that have been requested on the Merchant Configuration.
               */
              features: Merchant.Features | null;

              /**
               * The merchant category code for the merchant. MCCs are used to classify businesses based on the goods or services they provide.
               */
              mcc: string | null;

              /**
               * Statement descriptor.
               */
              statement_descriptor: Merchant.StatementDescriptor | null;

              /**
               * Publicly available contact information for sending support issues to.
               */
              support: Merchant.Support | null;
            }

            namespace Merchant {
              interface Branding {
                /**
                 * ID of a [file upload](https://docs.stripe.com/api/persons/update#create_file): An icon for the merchant. Must be square and at least 128px x 128px.
                 */
                icon: string | null;

                /**
                 * ID of a [file upload](https://docs.stripe.com/api/persons/update#create_file): A logo for the merchant that will be used in Checkout instead of the icon and without the merchant's name next to it if provided. Must be at least 128px x 128px.
                 */
                logo: string | null;

                /**
                 * A CSS hex color value representing the primary branding color for the merchant.
                 */
                primary_color: string | null;

                /**
                 * A CSS hex color value representing the secondary branding color for the merchant.
                 */
                secondary_color: string | null;
              }

              interface CardPayments {
                /**
                 * Automatically declines certain charge types regardless of whether the card issuer accepted or declined the charge.
                 */
                decline_on: CardPayments.DeclineOn | null;
              }

              namespace CardPayments {
                interface DeclineOn {
                  /**
                   * Whether Stripe automatically declines charges with an incorrect ZIP or postal code. This setting only applies when a ZIP or postal code is provided and they fail bank verification.
                   */
                  avs_failure: boolean | null;

                  /**
                   * Whether Stripe automatically declines charges with an incorrect CVC. This setting only applies when a CVC is provided and it fails bank verification.
                   */
                  cvc_failure: boolean | null;
                }
              }

              interface Features {
                /**
                 * Allow the merchant to collect card payments.
                 */
                card_payments: Features.CardPayments | null;
              }

              namespace Features {
                interface CardPayments {
                  /**
                   * Whether the Feature has been requested.
                   */
                  requested: boolean;

                  /**
                   * The status of the Feature.
                   */
                  status: CardPayments.Status;

                  /**
                   * Additional details regarding the status of the Feature. `status_details` will be empty if the Feature's status is `active`.
                   */
                  status_details: Array<CardPayments.StatusDetail>;
                }

                namespace CardPayments {
                  type Status =
                    | 'active'
                    | 'pending'
                    | 'restricted'
                    | 'unsupported';

                  interface StatusDetail {
                    /**
                     * Machine-readable code explaining the reason for the Feature to be in its current status.
                     */
                    code: StatusDetail.Code;

                    /**
                     * Machine-readable code explaining how to make the Feature active.
                     */
                    resolution: StatusDetail.Resolution;
                  }

                  namespace StatusDetail {
                    type Code =
                      | 'determining_status'
                      | 'requirements_past_due'
                      | 'requirements_pending_verification'
                      | 'restricted_other'
                      | 'unsupported_country';

                    type Resolution =
                      | 'contact_stripe'
                      | 'no_resolution'
                      | 'provide_info';
                  }
                }
              }

              interface StatementDescriptor {
                /**
                 * The default text that appears on statements for non-card charges outside of Japan. For card charges, if you don't set a statement_descriptor_prefix, this text is also used as the statement descriptor prefix. In that case, if concatenating the statement descriptor suffix causes the combined statement descriptor to exceed 22 characters, we truncate the statement_descriptor text to limit the full descriptor to 22 characters. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.
                 */
                descriptor: string | null;

                /**
                 * Default text that appears on statements for card charges outside of Japan, prefixing any dynamic statement_descriptor_suffix specified on the charge. To maximize space for the dynamic part of the descriptor, keep this text short. If you don't specify this value, statement_descriptor is used as the prefix. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.
                 */
                prefix: string | null;
              }

              interface Support {
                /**
                 * A publicly available mailing address for sending support issues to.
                 */
                address: Support.Address | null;

                /**
                 * A publicly available email address for sending support issues to.
                 */
                email: string | null;

                /**
                 * A publicly available phone number to call with support issues.
                 */
                phone: string | null;

                /**
                 * A publicly available website for handling support issues.
                 */
                url: string | null;
              }

              namespace Support {
                interface Address {
                  /**
                   * City, district, suburb, town, or village.
                   */
                  city: string | null;

                  /**
                   * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
                   */
                  country: Address.Country | null;

                  /**
                   * Address line 1 (e.g., street, PO Box, or company name).
                   */
                  line1: string | null;

                  /**
                   * Address line 2 (e.g., apartment, suite, unit, or building).
                   */
                  line2: string | null;

                  /**
                   * ZIP or postal code.
                   */
                  postal_code: string | null;

                  /**
                   * State, county, province, or region.
                   */
                  state: string | null;

                  /**
                   * Town or cho-me.
                   */
                  town: string | null;
                }

                namespace Address {
                  type Country =
                    | 'ad'
                    | 'ae'
                    | 'af'
                    | 'ag'
                    | 'ai'
                    | 'al'
                    | 'am'
                    | 'ao'
                    | 'aq'
                    | 'ar'
                    | 'as'
                    | 'at'
                    | 'au'
                    | 'aw'
                    | 'ax'
                    | 'az'
                    | 'ba'
                    | 'bb'
                    | 'bd'
                    | 'be'
                    | 'bf'
                    | 'bg'
                    | 'bh'
                    | 'bi'
                    | 'bj'
                    | 'bl'
                    | 'bm'
                    | 'bn'
                    | 'bo'
                    | 'bq'
                    | 'br'
                    | 'bs'
                    | 'bt'
                    | 'bv'
                    | 'bw'
                    | 'by'
                    | 'bz'
                    | 'ca'
                    | 'cc'
                    | 'cd'
                    | 'cf'
                    | 'cg'
                    | 'ch'
                    | 'ci'
                    | 'ck'
                    | 'cl'
                    | 'cm'
                    | 'cn'
                    | 'co'
                    | 'cr'
                    | 'cu'
                    | 'cv'
                    | 'cw'
                    | 'cx'
                    | 'cy'
                    | 'cz'
                    | 'de'
                    | 'dj'
                    | 'dk'
                    | 'dm'
                    | 'do'
                    | 'dz'
                    | 'ec'
                    | 'ee'
                    | 'eg'
                    | 'eh'
                    | 'er'
                    | 'es'
                    | 'et'
                    | 'fi'
                    | 'fj'
                    | 'fk'
                    | 'fm'
                    | 'fo'
                    | 'fr'
                    | 'ga'
                    | 'gb'
                    | 'gd'
                    | 'ge'
                    | 'gf'
                    | 'gg'
                    | 'gh'
                    | 'gi'
                    | 'gl'
                    | 'gm'
                    | 'gn'
                    | 'gp'
                    | 'gq'
                    | 'gr'
                    | 'gs'
                    | 'gt'
                    | 'gu'
                    | 'gw'
                    | 'gy'
                    | 'hk'
                    | 'hm'
                    | 'hn'
                    | 'hr'
                    | 'ht'
                    | 'hu'
                    | 'id'
                    | 'ie'
                    | 'il'
                    | 'im'
                    | 'in'
                    | 'io'
                    | 'iq'
                    | 'ir'
                    | 'is'
                    | 'it'
                    | 'je'
                    | 'jm'
                    | 'jo'
                    | 'jp'
                    | 'ke'
                    | 'kg'
                    | 'kh'
                    | 'ki'
                    | 'km'
                    | 'kn'
                    | 'kp'
                    | 'kr'
                    | 'kw'
                    | 'ky'
                    | 'kz'
                    | 'la'
                    | 'lb'
                    | 'lc'
                    | 'li'
                    | 'lk'
                    | 'lr'
                    | 'ls'
                    | 'lt'
                    | 'lu'
                    | 'lv'
                    | 'ly'
                    | 'ma'
                    | 'mc'
                    | 'md'
                    | 'me'
                    | 'mf'
                    | 'mg'
                    | 'mh'
                    | 'mk'
                    | 'ml'
                    | 'mm'
                    | 'mn'
                    | 'mo'
                    | 'mp'
                    | 'mq'
                    | 'mr'
                    | 'ms'
                    | 'mt'
                    | 'mu'
                    | 'mv'
                    | 'mw'
                    | 'mx'
                    | 'my'
                    | 'mz'
                    | 'na'
                    | 'nc'
                    | 'ne'
                    | 'nf'
                    | 'ng'
                    | 'ni'
                    | 'nl'
                    | 'no'
                    | 'np'
                    | 'nr'
                    | 'nu'
                    | 'nz'
                    | 'om'
                    | 'pa'
                    | 'pe'
                    | 'pf'
                    | 'pg'
                    | 'ph'
                    | 'pk'
                    | 'pl'
                    | 'pm'
                    | 'pn'
                    | 'pr'
                    | 'ps'
                    | 'pt'
                    | 'pw'
                    | 'py'
                    | 'qa'
                    | 'qz'
                    | 're'
                    | 'ro'
                    | 'rs'
                    | 'ru'
                    | 'rw'
                    | 'sa'
                    | 'sb'
                    | 'sc'
                    | 'sd'
                    | 'se'
                    | 'sg'
                    | 'sh'
                    | 'si'
                    | 'sj'
                    | 'sk'
                    | 'sl'
                    | 'sm'
                    | 'sn'
                    | 'so'
                    | 'sr'
                    | 'ss'
                    | 'st'
                    | 'sv'
                    | 'sx'
                    | 'sy'
                    | 'sz'
                    | 'tc'
                    | 'td'
                    | 'tf'
                    | 'tg'
                    | 'th'
                    | 'tj'
                    | 'tk'
                    | 'tl'
                    | 'tm'
                    | 'tn'
                    | 'to'
                    | 'tr'
                    | 'tt'
                    | 'tv'
                    | 'tw'
                    | 'tz'
                    | 'ua'
                    | 'ug'
                    | 'um'
                    | 'us'
                    | 'uy'
                    | 'uz'
                    | 'va'
                    | 'vc'
                    | 've'
                    | 'vg'
                    | 'vi'
                    | 'vn'
                    | 'vu'
                    | 'wf'
                    | 'ws'
                    | 'ye'
                    | 'yt'
                    | 'za'
                    | 'zm'
                    | 'zw';
                }
              }
            }

            interface Recipient {
              /**
               * Features that have been requested on the Recipient Configuration.
               */
              features: Recipient.Features | null;
            }

            namespace Recipient {
              interface Features {
                /**
                 * Features that enable the recipient to receive money into their Stripe Balance (/v1/balance).
                 */
                stripe_balance: Features.StripeBalance | null;
              }

              namespace Features {
                interface StripeBalance {
                  /**
                   * Allows the recipient to receive /v1/transfers into their Stripe Balance (/v1/balance).
                   */
                  stripe_transfers: StripeBalance.StripeTransfers | null;
                }

                namespace StripeBalance {
                  interface StripeTransfers {
                    /**
                     * Whether the Feature has been requested.
                     */
                    requested: boolean;

                    /**
                     * The status of the Feature.
                     */
                    status: StripeTransfers.Status;

                    /**
                     * Additional details regarding the status of the Feature. `status_details` will be empty if the Feature's status is `active`.
                     */
                    status_details: Array<StripeTransfers.StatusDetail>;
                  }

                  namespace StripeTransfers {
                    type Status =
                      | 'active'
                      | 'pending'
                      | 'restricted'
                      | 'unsupported';

                    interface StatusDetail {
                      /**
                       * Machine-readable code explaining the reason for the Feature to be in its current status.
                       */
                      code: StatusDetail.Code;

                      /**
                       * Machine-readable code explaining how to make the Feature active.
                       */
                      resolution: StatusDetail.Resolution;
                    }

                    namespace StatusDetail {
                      type Code =
                        | 'determining_status'
                        | 'requirements_past_due'
                        | 'requirements_pending_verification'
                        | 'restricted_other'
                        | 'unsupported_country';

                      type Resolution =
                        | 'contact_stripe'
                        | 'no_resolution'
                        | 'provide_info';
                    }
                  }
                }
              }
            }
          }

          type Dashboard = 'express' | 'full' | 'none';

          interface Defaults {
            /**
             * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
             */
            currency: Defaults.Currency | null;

            /**
             * The Account's preferred locales (languages), ordered by preference.
             */
            locales: Array<Defaults.Locale> | null;

            /**
             * Default responsibilities held by either Stripe or the platform.
             */
            responsibilities: Defaults.Responsibilities | null;
          }

          namespace Defaults {
            type Currency =
              | 'aed'
              | 'afn'
              | 'all'
              | 'amd'
              | 'ang'
              | 'aoa'
              | 'ars'
              | 'aud'
              | 'awg'
              | 'azn'
              | 'bam'
              | 'bbd'
              | 'bdt'
              | 'bgn'
              | 'bhd'
              | 'bif'
              | 'bmd'
              | 'bnd'
              | 'bob'
              | 'bov'
              | 'brl'
              | 'bsd'
              | 'btn'
              | 'bwp'
              | 'byn'
              | 'byr'
              | 'bzd'
              | 'cad'
              | 'cdf'
              | 'che'
              | 'chf'
              | 'chw'
              | 'clf'
              | 'clp'
              | 'cny'
              | 'cop'
              | 'cou'
              | 'crc'
              | 'cuc'
              | 'cup'
              | 'cve'
              | 'czk'
              | 'djf'
              | 'dkk'
              | 'dop'
              | 'dzd'
              | 'eek'
              | 'egp'
              | 'ern'
              | 'etb'
              | 'eur'
              | 'fjd'
              | 'fkp'
              | 'gbp'
              | 'gel'
              | 'ghc'
              | 'ghs'
              | 'gip'
              | 'gmd'
              | 'gnf'
              | 'gtq'
              | 'gyd'
              | 'hkd'
              | 'hnl'
              | 'hrk'
              | 'htg'
              | 'huf'
              | 'idr'
              | 'ils'
              | 'inr'
              | 'iqd'
              | 'irr'
              | 'isk'
              | 'jmd'
              | 'jod'
              | 'jpy'
              | 'kes'
              | 'kgs'
              | 'khr'
              | 'kmf'
              | 'kpw'
              | 'krw'
              | 'kwd'
              | 'kyd'
              | 'kzt'
              | 'lak'
              | 'lbp'
              | 'lkr'
              | 'lrd'
              | 'lsl'
              | 'ltl'
              | 'lvl'
              | 'lyd'
              | 'mad'
              | 'mdl'
              | 'mga'
              | 'mkd'
              | 'mmk'
              | 'mnt'
              | 'mop'
              | 'mro'
              | 'mru'
              | 'mur'
              | 'mvr'
              | 'mwk'
              | 'mxn'
              | 'mxv'
              | 'myr'
              | 'mzn'
              | 'nad'
              | 'ngn'
              | 'nio'
              | 'nok'
              | 'npr'
              | 'nzd'
              | 'omr'
              | 'pab'
              | 'pen'
              | 'pgk'
              | 'php'
              | 'pkr'
              | 'pln'
              | 'pyg'
              | 'qar'
              | 'ron'
              | 'rsd'
              | 'rub'
              | 'rwf'
              | 'sar'
              | 'sbd'
              | 'scr'
              | 'sdg'
              | 'sek'
              | 'sgd'
              | 'shp'
              | 'sle'
              | 'sll'
              | 'sos'
              | 'srd'
              | 'ssp'
              | 'std'
              | 'stn'
              | 'svc'
              | 'syp'
              | 'szl'
              | 'thb'
              | 'tjs'
              | 'tmt'
              | 'tnd'
              | 'top'
              | 'try'
              | 'ttd'
              | 'twd'
              | 'tzs'
              | 'uah'
              | 'ugx'
              | 'usd'
              | 'usdc'
              | 'usn'
              | 'uyi'
              | 'uyu'
              | 'uzs'
              | 'vef'
              | 'ves'
              | 'vnd'
              | 'vuv'
              | 'wst'
              | 'xaf'
              | 'xcd'
              | 'xof'
              | 'xpf'
              | 'yer'
              | 'zar'
              | 'zmk'
              | 'zmw'
              | 'zwd'
              | 'zwl';

            type Locale =
              | 'ar-SA'
              | 'bg'
              | 'bg-BG'
              | 'cs'
              | 'cs-CZ'
              | 'da'
              | 'da-DK'
              | 'de'
              | 'de-DE'
              | 'el'
              | 'el-GR'
              | 'en'
              | 'en-AU'
              | 'en-CA'
              | 'en-GB'
              | 'en-IE'
              | 'en-IN'
              | 'en-NZ'
              | 'en-SG'
              | 'en-US'
              | 'es'
              | 'es-419'
              | 'es-ES'
              | 'et'
              | 'et-EE'
              | 'fi'
              | 'fil'
              | 'fil-PH'
              | 'fi-FI'
              | 'fr'
              | 'fr-CA'
              | 'fr-FR'
              | 'he-IL'
              | 'hr'
              | 'hr-HR'
              | 'hu'
              | 'hu-HU'
              | 'id'
              | 'id-ID'
              | 'it'
              | 'it-IT'
              | 'ja'
              | 'ja-JP'
              | 'ko'
              | 'ko-KR'
              | 'lt'
              | 'lt-LT'
              | 'lv'
              | 'lv-LV'
              | 'ms'
              | 'ms-MY'
              | 'mt'
              | 'mt-MT'
              | 'nb'
              | 'nb-NO'
              | 'nl'
              | 'nl-NL'
              | 'pl'
              | 'pl-PL'
              | 'pt'
              | 'pt-BR'
              | 'pt-PT'
              | 'ro'
              | 'ro-RO'
              | 'ru'
              | 'ru-RU'
              | 'sk'
              | 'sk-SK'
              | 'sl'
              | 'sl-SI'
              | 'sv'
              | 'sv-SE'
              | 'th'
              | 'th-TH'
              | 'tr'
              | 'tr-TR'
              | 'vi'
              | 'vi-VN'
              | 'zh'
              | 'zh-Hans'
              | 'zh-Hant-HK'
              | 'zh-Hant-TW'
              | 'zh-HK'
              | 'zh-TW';

            interface Responsibilities {
              /**
               * A value indicating the responsible payer of a bundle of Stripe fees for pricing-control eligible products on this Account.
               */
              fees_collector: Responsibilities.FeesCollector;

              /**
               * A value indicating who is responsible for losses when this Account can't pay back negative balances from payments.
               */
              losses_collector: Responsibilities.LossesCollector;
            }

            namespace Responsibilities {
              type FeesCollector = 'application' | 'stripe';

              type LossesCollector = 'application' | 'stripe';
            }
          }

          interface Identity {
            /**
             * Attestations from the identity's key people, e.g. owners, executives, directors.
             */
            attestations: Identity.Attestations | null;

            /**
             * Information about the company or business.
             */
            business_details: Identity.BusinessDetails | null;

            /**
             * The country in which the account holder resides, or in which the business is legally established. This should be an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.
             */
            country: Identity.Country | null;

            /**
             * The entity type.
             */
            entity_type: Identity.EntityType | null;

            /**
             * Information about the individual represented by the Account. This property is `null` unless `entity_type` is set to `individual`.
             */
            individual: Identity.Individual | null;
          }

          namespace Identity {
            interface Attestations {
              /**
               * This hash is used to attest that the beneficial owner information provided to Stripe is both current and correct.
               */
              ownership_declaration: Attestations.OwnershipDeclaration | null;

              /**
               * Attestation that all Persons with a specific Relationship value have been provided.
               */
              persons_provided: Attestations.PersonsProvided | null;

              /**
               * Attestations of accepted terms of service agreements.
               */
              terms_of_service: Attestations.TermsOfService | null;
            }

            namespace Attestations {
              interface OwnershipDeclaration {
                /**
                 * The time marking when the beneficial owner attestation was made. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
                 */
                date: string | null;

                /**
                 * The IP address from which the beneficial owner attestation was made.
                 */
                ip: string | null;

                /**
                 * The user agent of the browser from which the beneficial owner attestation was made.
                 */
                user_agent: string | null;
              }

              interface PersonsProvided {
                /**
                 * Whether the company's directors have been provided. Set this Boolean to true after creating all the company's directors with the [Persons API](https://docs.stripe.com/api/v2/core/accounts/createperson).
                 */
                directors: boolean | null;

                /**
                 * Whether the company's executives have been provided. Set this Boolean to true after creating all the company's executives with the [Persons API](https://docs.stripe.com/api/v2/core/accounts/createperson).
                 */
                executives: boolean | null;

                /**
                 * Whether the company's owners have been provided. Set this Boolean to true after creating all the company's owners with the [Persons API](https://docs.stripe.com/api/v2/core/accounts/createperson).
                 */
                owners: boolean | null;
              }

              interface TermsOfService {
                /**
                 * Details on the Account's acceptance of the [Stripe Services Agreement](https://docs.stripe.com/connect/updating-accounts#tos-acceptance).
                 */
                account: TermsOfService.Account | null;
              }

              namespace TermsOfService {
                interface Account {
                  /**
                   * The time when the Account's representative accepted the terms of service. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
                   */
                  date: string | null;

                  /**
                   * The IP address from which the Account's representative accepted the terms of service.
                   */
                  ip: string | null;

                  /**
                   * The user agent of the browser from which the Account's representative accepted the terms of service.
                   */
                  user_agent: string | null;
                }
              }
            }

            interface BusinessDetails {
              /**
               * The company's primary address.
               */
              address: BusinessDetails.Address | null;

              /**
               * The business gross annual revenue for its preceding fiscal year.
               */
              annual_revenue: BusinessDetails.AnnualRevenue | null;

              /**
               * Documents that may be submitted to satisfy various informational requests.
               */
              documents: BusinessDetails.Documents | null;

              /**
               * The company's legal name.
               */
              doing_business_as: string | null;

              /**
               * An estimated upper bound of employees, contractors, vendors, etc. currently working for the business.
               */
              estimated_worker_count: number | null;

              /**
               * The provided ID numbers of a business entity.
               */
              id_numbers: Array<BusinessDetails.IdNumber> | null;

              /**
               * An estimate of the monthly revenue of the business.
               */
              monthly_estimated_revenue: BusinessDetails.MonthlyEstimatedRevenue | null;

              /**
               * The company's phone number (used for verification).
               */
              phone: string | null;

              /**
               * Internal-only description of the product sold or service provided by the business. It's used by Stripe for risk and underwriting purposes.
               */
              product_description: string | null;

              /**
               * The business legal name.
               */
              registered_name: string | null;

              /**
               * The category identifying the legal structure of the business.
               */
              structure: BusinessDetails.Structure | null;

              /**
               * The business's publicly available website.
               */
              url: string | null;
            }

            namespace BusinessDetails {
              interface Address {
                /**
                 * City, district, suburb, town, or village.
                 */
                city: string | null;

                /**
                 * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
                 */
                country: Address.Country | null;

                /**
                 * Address line 1 (e.g., street, PO Box, or company name).
                 */
                line1: string | null;

                /**
                 * Address line 2 (e.g., apartment, suite, unit, or building).
                 */
                line2: string | null;

                /**
                 * ZIP or postal code.
                 */
                postal_code: string | null;

                /**
                 * State, county, province, or region.
                 */
                state: string | null;

                /**
                 * Town or cho-me.
                 */
                town: string | null;
              }

              namespace Address {
                type Country =
                  | 'ad'
                  | 'ae'
                  | 'af'
                  | 'ag'
                  | 'ai'
                  | 'al'
                  | 'am'
                  | 'ao'
                  | 'aq'
                  | 'ar'
                  | 'as'
                  | 'at'
                  | 'au'
                  | 'aw'
                  | 'ax'
                  | 'az'
                  | 'ba'
                  | 'bb'
                  | 'bd'
                  | 'be'
                  | 'bf'
                  | 'bg'
                  | 'bh'
                  | 'bi'
                  | 'bj'
                  | 'bl'
                  | 'bm'
                  | 'bn'
                  | 'bo'
                  | 'bq'
                  | 'br'
                  | 'bs'
                  | 'bt'
                  | 'bv'
                  | 'bw'
                  | 'by'
                  | 'bz'
                  | 'ca'
                  | 'cc'
                  | 'cd'
                  | 'cf'
                  | 'cg'
                  | 'ch'
                  | 'ci'
                  | 'ck'
                  | 'cl'
                  | 'cm'
                  | 'cn'
                  | 'co'
                  | 'cr'
                  | 'cu'
                  | 'cv'
                  | 'cw'
                  | 'cx'
                  | 'cy'
                  | 'cz'
                  | 'de'
                  | 'dj'
                  | 'dk'
                  | 'dm'
                  | 'do'
                  | 'dz'
                  | 'ec'
                  | 'ee'
                  | 'eg'
                  | 'eh'
                  | 'er'
                  | 'es'
                  | 'et'
                  | 'fi'
                  | 'fj'
                  | 'fk'
                  | 'fm'
                  | 'fo'
                  | 'fr'
                  | 'ga'
                  | 'gb'
                  | 'gd'
                  | 'ge'
                  | 'gf'
                  | 'gg'
                  | 'gh'
                  | 'gi'
                  | 'gl'
                  | 'gm'
                  | 'gn'
                  | 'gp'
                  | 'gq'
                  | 'gr'
                  | 'gs'
                  | 'gt'
                  | 'gu'
                  | 'gw'
                  | 'gy'
                  | 'hk'
                  | 'hm'
                  | 'hn'
                  | 'hr'
                  | 'ht'
                  | 'hu'
                  | 'id'
                  | 'ie'
                  | 'il'
                  | 'im'
                  | 'in'
                  | 'io'
                  | 'iq'
                  | 'ir'
                  | 'is'
                  | 'it'
                  | 'je'
                  | 'jm'
                  | 'jo'
                  | 'jp'
                  | 'ke'
                  | 'kg'
                  | 'kh'
                  | 'ki'
                  | 'km'
                  | 'kn'
                  | 'kp'
                  | 'kr'
                  | 'kw'
                  | 'ky'
                  | 'kz'
                  | 'la'
                  | 'lb'
                  | 'lc'
                  | 'li'
                  | 'lk'
                  | 'lr'
                  | 'ls'
                  | 'lt'
                  | 'lu'
                  | 'lv'
                  | 'ly'
                  | 'ma'
                  | 'mc'
                  | 'md'
                  | 'me'
                  | 'mf'
                  | 'mg'
                  | 'mh'
                  | 'mk'
                  | 'ml'
                  | 'mm'
                  | 'mn'
                  | 'mo'
                  | 'mp'
                  | 'mq'
                  | 'mr'
                  | 'ms'
                  | 'mt'
                  | 'mu'
                  | 'mv'
                  | 'mw'
                  | 'mx'
                  | 'my'
                  | 'mz'
                  | 'na'
                  | 'nc'
                  | 'ne'
                  | 'nf'
                  | 'ng'
                  | 'ni'
                  | 'nl'
                  | 'no'
                  | 'np'
                  | 'nr'
                  | 'nu'
                  | 'nz'
                  | 'om'
                  | 'pa'
                  | 'pe'
                  | 'pf'
                  | 'pg'
                  | 'ph'
                  | 'pk'
                  | 'pl'
                  | 'pm'
                  | 'pn'
                  | 'pr'
                  | 'ps'
                  | 'pt'
                  | 'pw'
                  | 'py'
                  | 'qa'
                  | 'qz'
                  | 're'
                  | 'ro'
                  | 'rs'
                  | 'ru'
                  | 'rw'
                  | 'sa'
                  | 'sb'
                  | 'sc'
                  | 'sd'
                  | 'se'
                  | 'sg'
                  | 'sh'
                  | 'si'
                  | 'sj'
                  | 'sk'
                  | 'sl'
                  | 'sm'
                  | 'sn'
                  | 'so'
                  | 'sr'
                  | 'ss'
                  | 'st'
                  | 'sv'
                  | 'sx'
                  | 'sy'
                  | 'sz'
                  | 'tc'
                  | 'td'
                  | 'tf'
                  | 'tg'
                  | 'th'
                  | 'tj'
                  | 'tk'
                  | 'tl'
                  | 'tm'
                  | 'tn'
                  | 'to'
                  | 'tr'
                  | 'tt'
                  | 'tv'
                  | 'tw'
                  | 'tz'
                  | 'ua'
                  | 'ug'
                  | 'um'
                  | 'us'
                  | 'uy'
                  | 'uz'
                  | 'va'
                  | 'vc'
                  | 've'
                  | 'vg'
                  | 'vi'
                  | 'vn'
                  | 'vu'
                  | 'wf'
                  | 'ws'
                  | 'ye'
                  | 'yt'
                  | 'za'
                  | 'zm'
                  | 'zw';
              }

              interface AnnualRevenue {
                /**
                 * A non-negative integer representing the amount in the smallest currency unit.
                 */
                amount: Amount | null;

                /**
                 * The close-out date of the preceding fiscal year in ISO 8601 format. E.g. 2023-12-31 for the 31st of December, 2023.
                 */
                fiscal_year_end: string | null;
              }

              interface Documents {
                /**
                 * One or more documents that support the Bank account ownership verification requirement. Must be a document associated with the account's primary active bank account that displays the last 4 digits of the account number, either a statement or a check.
                 */
                bank_account_ownership_verification: Documents.BankAccountOwnershipVerification | null;

                /**
                 * One or more documents that demonstrate proof of a company's license to operate.
                 */
                company_license: Documents.CompanyLicense | null;

                /**
                 * One or more documents showing the company's Memorandum of Association.
                 */
                company_memorandum_of_association: Documents.CompanyMemorandumOfAssociation | null;

                /**
                 * Certain countries only: One or more documents showing the ministerial decree legalizing the company's establishment.
                 */
                company_ministerial_decree: Documents.CompanyMinisterialDecree | null;

                /**
                 * One or more documents that demonstrate proof of a company's registration with the appropriate local authorities.
                 */
                company_registration_verification: Documents.CompanyRegistrationVerification | null;

                /**
                 * One or more documents that demonstrate proof of a company's tax ID.
                 */
                company_tax_id_verification: Documents.CompanyTaxIdVerification | null;

                /**
                 * A document verifying the business.
                 */
                primary_verification: Documents.PrimaryVerification | null;

                /**
                 * One or more documents showing the company's proof of registration with the national business registry.
                 */
                proof_of_registration: Documents.ProofOfRegistration | null;
              }

              namespace Documents {
                interface BankAccountOwnershipVerification {
                  /**
                   * One or more document IDs returned by a [file upload](https://docs.stripe.com/api/persons/update#create_file) with a purpose value of `account_requirement`.
                   */
                  files: Array<string>;

                  /**
                   * The format of the document. Currently supports `files` only.
                   */
                  type: 'files';
                }

                interface CompanyLicense {
                  /**
                   * One or more document IDs returned by a [file upload](https://docs.stripe.com/api/persons/update#create_file) with a purpose value of `account_requirement`.
                   */
                  files: Array<string>;

                  /**
                   * The format of the document. Currently supports `files` only.
                   */
                  type: 'files';
                }

                interface CompanyMemorandumOfAssociation {
                  /**
                   * One or more document IDs returned by a [file upload](https://docs.stripe.com/api/persons/update#create_file) with a purpose value of `account_requirement`.
                   */
                  files: Array<string>;

                  /**
                   * The format of the document. Currently supports `files` only.
                   */
                  type: 'files';
                }

                interface CompanyMinisterialDecree {
                  /**
                   * One or more document IDs returned by a [file upload](https://docs.stripe.com/api/persons/update#create_file) with a purpose value of `account_requirement`.
                   */
                  files: Array<string>;

                  /**
                   * The format of the document. Currently supports `files` only.
                   */
                  type: 'files';
                }

                interface CompanyRegistrationVerification {
                  /**
                   * One or more document IDs returned by a [file upload](https://docs.stripe.com/api/persons/update#create_file) with a purpose value of `account_requirement`.
                   */
                  files: Array<string>;

                  /**
                   * The format of the document. Currently supports `files` only.
                   */
                  type: 'files';
                }

                interface CompanyTaxIdVerification {
                  /**
                   * One or more document IDs returned by a [file upload](https://docs.stripe.com/api/persons/update#create_file) with a purpose value of `account_requirement`.
                   */
                  files: Array<string>;

                  /**
                   * The format of the document. Currently supports `files` only.
                   */
                  type: 'files';
                }

                interface PrimaryVerification {
                  /**
                   * If the type is `front_back`, [file upload](https://docs.stripe.com/api/persons/update#create_file) tokens referring to each side of the document..
                   */
                  front_back: PrimaryVerification.FrontBack;

                  /**
                   * The format of the verification document. Currently supports `front_back` only.
                   */
                  type: 'front_back';
                }

                namespace PrimaryVerification {
                  interface FrontBack {
                    /**
                     * A [file upload](https://docs.stripe.com/api/persons/update#create_file) token representing the back of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
                     */
                    back: string;

                    /**
                     * A [file upload](https://docs.stripe.com/api/persons/update#create_file) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
                     */
                    front: string;
                  }
                }

                interface ProofOfRegistration {
                  /**
                   * One or more document IDs returned by a [file upload](https://docs.stripe.com/api/persons/update#create_file) with a purpose value of `account_requirement`.
                   */
                  files: Array<string>;

                  /**
                   * The format of the document. Currently supports `files` only.
                   */
                  type: 'files';
                }
              }

              interface IdNumber {
                /**
                 * The registrar of the ID number (Only valid for DE ID number types).
                 */
                registrar: string | null;

                /**
                 * Open Enum. The ID number type of a business entity.
                 */
                type: IdNumber.Type;
              }

              namespace IdNumber {
                type Type =
                  | 'ae_crn'
                  | 'at_fn'
                  | 'au_abn'
                  | 'au_acn'
                  | 'au_in'
                  | 'be_cbe'
                  | 'bg_uic'
                  | 'br_cnpj'
                  | 'ca_cn'
                  | 'ca_crarr'
                  | 'ca_neq'
                  | 'ca_rid'
                  | 'ch_chid'
                  | 'ch_uid'
                  | 'cy_tic'
                  | 'cz_ico'
                  | 'de_hrn'
                  | 'dk_cvr'
                  | 'ee_rk'
                  | 'es_cif'
                  | 'fi_yt'
                  | 'fr_siren'
                  | 'gb_crn'
                  | 'gi_crn'
                  | 'gr_gemi'
                  | 'hk_br'
                  | 'hk_cr'
                  | 'hk_mbs'
                  | 'hu_cjs'
                  | 'ie_crn'
                  | 'it_rea'
                  | 'it_vat'
                  | 'li_uid'
                  | 'lt_ccrn'
                  | 'lu_rcs'
                  | 'lv_urn'
                  | 'mt_crn'
                  | 'my_coid'
                  | 'nl_kvk'
                  | 'no_orgnr'
                  | 'nz_bn'
                  | 'pl_regon'
                  | 'pt_vat'
                  | 'ro_cui'
                  | 'se_orgnr'
                  | 'sg_uen'
                  | 'si_msp'
                  | 'sk_ico'
                  | 'th_crn'
                  | 'th_prn'
                  | 'th_tin'
                  | 'us_ein';
              }

              interface MonthlyEstimatedRevenue {
                /**
                 * A non-negative integer representing the amount in the smallest currency unit.
                 */
                amount: Amount | null;
              }

              type Structure =
                | 'free_zone_establishment'
                | 'free_zone_llc'
                | 'governmental_unit'
                | 'government_instrumentality'
                | 'incorporated_non_profit'
                | 'incorporated_partnership'
                | 'llc'
                | 'multi_member_llc'
                | 'private_company'
                | 'private_corporation'
                | 'private_partnership'
                | 'public_company'
                | 'public_corporation'
                | 'public_partnership'
                | 'registered_charity'
                | 'single_member_llc'
                | 'sole_establishment'
                | 'sole_proprietorship'
                | 'tax_exempt_government_instrumentality'
                | 'unincorporated_association'
                | 'unincorporated_non_profit'
                | 'unincorporated_partnership';
            }

            type Country =
              | 'ad'
              | 'ae'
              | 'af'
              | 'ag'
              | 'ai'
              | 'al'
              | 'am'
              | 'ao'
              | 'aq'
              | 'ar'
              | 'as'
              | 'at'
              | 'au'
              | 'aw'
              | 'ax'
              | 'az'
              | 'ba'
              | 'bb'
              | 'bd'
              | 'be'
              | 'bf'
              | 'bg'
              | 'bh'
              | 'bi'
              | 'bj'
              | 'bl'
              | 'bm'
              | 'bn'
              | 'bo'
              | 'bq'
              | 'br'
              | 'bs'
              | 'bt'
              | 'bv'
              | 'bw'
              | 'by'
              | 'bz'
              | 'ca'
              | 'cc'
              | 'cd'
              | 'cf'
              | 'cg'
              | 'ch'
              | 'ci'
              | 'ck'
              | 'cl'
              | 'cm'
              | 'cn'
              | 'co'
              | 'cr'
              | 'cu'
              | 'cv'
              | 'cw'
              | 'cx'
              | 'cy'
              | 'cz'
              | 'de'
              | 'dj'
              | 'dk'
              | 'dm'
              | 'do'
              | 'dz'
              | 'ec'
              | 'ee'
              | 'eg'
              | 'eh'
              | 'er'
              | 'es'
              | 'et'
              | 'fi'
              | 'fj'
              | 'fk'
              | 'fm'
              | 'fo'
              | 'fr'
              | 'ga'
              | 'gb'
              | 'gd'
              | 'ge'
              | 'gf'
              | 'gg'
              | 'gh'
              | 'gi'
              | 'gl'
              | 'gm'
              | 'gn'
              | 'gp'
              | 'gq'
              | 'gr'
              | 'gs'
              | 'gt'
              | 'gu'
              | 'gw'
              | 'gy'
              | 'hk'
              | 'hm'
              | 'hn'
              | 'hr'
              | 'ht'
              | 'hu'
              | 'id'
              | 'ie'
              | 'il'
              | 'im'
              | 'in'
              | 'io'
              | 'iq'
              | 'ir'
              | 'is'
              | 'it'
              | 'je'
              | 'jm'
              | 'jo'
              | 'jp'
              | 'ke'
              | 'kg'
              | 'kh'
              | 'ki'
              | 'km'
              | 'kn'
              | 'kp'
              | 'kr'
              | 'kw'
              | 'ky'
              | 'kz'
              | 'la'
              | 'lb'
              | 'lc'
              | 'li'
              | 'lk'
              | 'lr'
              | 'ls'
              | 'lt'
              | 'lu'
              | 'lv'
              | 'ly'
              | 'ma'
              | 'mc'
              | 'md'
              | 'me'
              | 'mf'
              | 'mg'
              | 'mh'
              | 'mk'
              | 'ml'
              | 'mm'
              | 'mn'
              | 'mo'
              | 'mp'
              | 'mq'
              | 'mr'
              | 'ms'
              | 'mt'
              | 'mu'
              | 'mv'
              | 'mw'
              | 'mx'
              | 'my'
              | 'mz'
              | 'na'
              | 'nc'
              | 'ne'
              | 'nf'
              | 'ng'
              | 'ni'
              | 'nl'
              | 'no'
              | 'np'
              | 'nr'
              | 'nu'
              | 'nz'
              | 'om'
              | 'pa'
              | 'pe'
              | 'pf'
              | 'pg'
              | 'ph'
              | 'pk'
              | 'pl'
              | 'pm'
              | 'pn'
              | 'pr'
              | 'ps'
              | 'pt'
              | 'pw'
              | 'py'
              | 'qa'
              | 'qz'
              | 're'
              | 'ro'
              | 'rs'
              | 'ru'
              | 'rw'
              | 'sa'
              | 'sb'
              | 'sc'
              | 'sd'
              | 'se'
              | 'sg'
              | 'sh'
              | 'si'
              | 'sj'
              | 'sk'
              | 'sl'
              | 'sm'
              | 'sn'
              | 'so'
              | 'sr'
              | 'ss'
              | 'st'
              | 'sv'
              | 'sx'
              | 'sy'
              | 'sz'
              | 'tc'
              | 'td'
              | 'tf'
              | 'tg'
              | 'th'
              | 'tj'
              | 'tk'
              | 'tl'
              | 'tm'
              | 'tn'
              | 'to'
              | 'tr'
              | 'tt'
              | 'tv'
              | 'tw'
              | 'tz'
              | 'ua'
              | 'ug'
              | 'um'
              | 'us'
              | 'uy'
              | 'uz'
              | 'va'
              | 'vc'
              | 've'
              | 'vg'
              | 'vi'
              | 'vn'
              | 'vu'
              | 'wf'
              | 'ws'
              | 'ye'
              | 'yt'
              | 'za'
              | 'zm'
              | 'zw';

            type EntityType =
              | 'company'
              | 'government_entity'
              | 'individual'
              | 'non_profit';

            interface Individual {
              /**
               * The account ID which the individual belongs to.
               */
              account: string;

              /**
               * Additional addresses associated with the individual.
               */
              additional_addresses: Array<Individual.AdditionalAddress> | null;

              /**
               * Additional names (e.g. aliases) associated with the individual.
               */
              additional_names: Array<Individual.AdditionalName> | null;

              /**
               * Terms of service acceptances.
               */
              additional_terms_of_service: Individual.AdditionalTermsOfService | null;

              /**
               * The individual's residential address.
               */
              address: Individual.Address | null;

              /**
               * Time at which the object was created. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
               */
              created: string;

              /**
               * The individual's date of birth.
               */
              date_of_birth: Individual.DateOfBirth | null;

              /**
               * Documents that may be submitted to satisfy various informational requests.
               */
              documents: Individual.Documents | null;

              /**
               * The individual's email address.
               */
              email: string | null;

              /**
               * The individual's first name.
               */
              given_name: string | null;

              /**
               * Unique identifier for the object.
               */
              id: string;

              /**
               * The identification numbers (e.g., SSN) associated with the individual.
               */
              id_numbers: Array<Individual.IdNumber> | null;

              /**
               * The individual's gender (International regulations require either "male” or "female").
               */
              legal_gender: Individual.LegalGender | null;

              /**
               * The countries where the individual is a national. Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
               */
              nationalities: Array<Individual.Nationality> | null;

              /**
               * String representing the object's type. Objects of the same type share the same value.
               */
              object: string;

              /**
               * The individual's phone number.
               */
              phone: string | null;

              /**
               * Indicates if the individual or any of their representatives, family members, or other closely related persons, declares that they hold or have held an important public job or function, in any jurisdiction.
               */
              political_exposure: Individual.PoliticalExposure | null;

              /**
               * The relationship that this individual has with the Account's identity.
               */
              relationship: Individual.Relationship | null;

              /**
               * The individual's last name.
               */
              surname: string | null;

              /**
               * Time at which the object was last updated.
               */
              updated: string;
            }

            namespace Individual {
              interface AdditionalAddress {
                /**
                 * City, district, suburb, town, or village.
                 */
                city: string | null;

                /**
                 * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
                 */
                country: AdditionalAddress.Country | null;

                /**
                 * Address line 1 (e.g., street, PO Box, or company name).
                 */
                line1: string | null;

                /**
                 * Address line 2 (e.g., apartment, suite, unit, or building).
                 */
                line2: string | null;

                /**
                 * ZIP or postal code.
                 */
                postal_code: string | null;

                /**
                 * Purpose of additional address.
                 */
                purpose: 'registered';

                /**
                 * State, county, province, or region.
                 */
                state: string | null;

                /**
                 * Town or cho-me.
                 */
                town: string | null;
              }

              namespace AdditionalAddress {
                type Country =
                  | 'ad'
                  | 'ae'
                  | 'af'
                  | 'ag'
                  | 'ai'
                  | 'al'
                  | 'am'
                  | 'ao'
                  | 'aq'
                  | 'ar'
                  | 'as'
                  | 'at'
                  | 'au'
                  | 'aw'
                  | 'ax'
                  | 'az'
                  | 'ba'
                  | 'bb'
                  | 'bd'
                  | 'be'
                  | 'bf'
                  | 'bg'
                  | 'bh'
                  | 'bi'
                  | 'bj'
                  | 'bl'
                  | 'bm'
                  | 'bn'
                  | 'bo'
                  | 'bq'
                  | 'br'
                  | 'bs'
                  | 'bt'
                  | 'bv'
                  | 'bw'
                  | 'by'
                  | 'bz'
                  | 'ca'
                  | 'cc'
                  | 'cd'
                  | 'cf'
                  | 'cg'
                  | 'ch'
                  | 'ci'
                  | 'ck'
                  | 'cl'
                  | 'cm'
                  | 'cn'
                  | 'co'
                  | 'cr'
                  | 'cu'
                  | 'cv'
                  | 'cw'
                  | 'cx'
                  | 'cy'
                  | 'cz'
                  | 'de'
                  | 'dj'
                  | 'dk'
                  | 'dm'
                  | 'do'
                  | 'dz'
                  | 'ec'
                  | 'ee'
                  | 'eg'
                  | 'eh'
                  | 'er'
                  | 'es'
                  | 'et'
                  | 'fi'
                  | 'fj'
                  | 'fk'
                  | 'fm'
                  | 'fo'
                  | 'fr'
                  | 'ga'
                  | 'gb'
                  | 'gd'
                  | 'ge'
                  | 'gf'
                  | 'gg'
                  | 'gh'
                  | 'gi'
                  | 'gl'
                  | 'gm'
                  | 'gn'
                  | 'gp'
                  | 'gq'
                  | 'gr'
                  | 'gs'
                  | 'gt'
                  | 'gu'
                  | 'gw'
                  | 'gy'
                  | 'hk'
                  | 'hm'
                  | 'hn'
                  | 'hr'
                  | 'ht'
                  | 'hu'
                  | 'id'
                  | 'ie'
                  | 'il'
                  | 'im'
                  | 'in'
                  | 'io'
                  | 'iq'
                  | 'ir'
                  | 'is'
                  | 'it'
                  | 'je'
                  | 'jm'
                  | 'jo'
                  | 'jp'
                  | 'ke'
                  | 'kg'
                  | 'kh'
                  | 'ki'
                  | 'km'
                  | 'kn'
                  | 'kp'
                  | 'kr'
                  | 'kw'
                  | 'ky'
                  | 'kz'
                  | 'la'
                  | 'lb'
                  | 'lc'
                  | 'li'
                  | 'lk'
                  | 'lr'
                  | 'ls'
                  | 'lt'
                  | 'lu'
                  | 'lv'
                  | 'ly'
                  | 'ma'
                  | 'mc'
                  | 'md'
                  | 'me'
                  | 'mf'
                  | 'mg'
                  | 'mh'
                  | 'mk'
                  | 'ml'
                  | 'mm'
                  | 'mn'
                  | 'mo'
                  | 'mp'
                  | 'mq'
                  | 'mr'
                  | 'ms'
                  | 'mt'
                  | 'mu'
                  | 'mv'
                  | 'mw'
                  | 'mx'
                  | 'my'
                  | 'mz'
                  | 'na'
                  | 'nc'
                  | 'ne'
                  | 'nf'
                  | 'ng'
                  | 'ni'
                  | 'nl'
                  | 'no'
                  | 'np'
                  | 'nr'
                  | 'nu'
                  | 'nz'
                  | 'om'
                  | 'pa'
                  | 'pe'
                  | 'pf'
                  | 'pg'
                  | 'ph'
                  | 'pk'
                  | 'pl'
                  | 'pm'
                  | 'pn'
                  | 'pr'
                  | 'ps'
                  | 'pt'
                  | 'pw'
                  | 'py'
                  | 'qa'
                  | 'qz'
                  | 're'
                  | 'ro'
                  | 'rs'
                  | 'ru'
                  | 'rw'
                  | 'sa'
                  | 'sb'
                  | 'sc'
                  | 'sd'
                  | 'se'
                  | 'sg'
                  | 'sh'
                  | 'si'
                  | 'sj'
                  | 'sk'
                  | 'sl'
                  | 'sm'
                  | 'sn'
                  | 'so'
                  | 'sr'
                  | 'ss'
                  | 'st'
                  | 'sv'
                  | 'sx'
                  | 'sy'
                  | 'sz'
                  | 'tc'
                  | 'td'
                  | 'tf'
                  | 'tg'
                  | 'th'
                  | 'tj'
                  | 'tk'
                  | 'tl'
                  | 'tm'
                  | 'tn'
                  | 'to'
                  | 'tr'
                  | 'tt'
                  | 'tv'
                  | 'tw'
                  | 'tz'
                  | 'ua'
                  | 'ug'
                  | 'um'
                  | 'us'
                  | 'uy'
                  | 'uz'
                  | 'va'
                  | 'vc'
                  | 've'
                  | 'vg'
                  | 'vi'
                  | 'vn'
                  | 'vu'
                  | 'wf'
                  | 'ws'
                  | 'ye'
                  | 'yt'
                  | 'za'
                  | 'zm'
                  | 'zw';
              }

              interface AdditionalName {
                /**
                 * The individual's full name.
                 */
                full_name: string | null;

                /**
                 * The individual's first or given name.
                 */
                given_name: string | null;

                /**
                 * The purpose or type of the additional name.
                 */
                purpose: AdditionalName.Purpose;

                /**
                 * The individual's last or family name.
                 */
                surname: string | null;
              }

              namespace AdditionalName {
                type Purpose = 'alias' | 'maiden';
              }

              interface AdditionalTermsOfService {
                /**
                 * Stripe terms of service agreement.
                 */
                account: AdditionalTermsOfService.Account | null;
              }

              namespace AdditionalTermsOfService {
                interface Account {
                  /**
                   * The time when the Account's representative accepted the terms of service. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.
                   */
                  date: string | null;

                  /**
                   * The IP address from which the Account's representative accepted the terms of service.
                   */
                  ip: string | null;

                  /**
                   * The user agent of the browser from which the Account's representative accepted the terms of service.
                   */
                  user_agent: string | null;
                }
              }

              interface Address {
                /**
                 * City, district, suburb, town, or village.
                 */
                city: string | null;

                /**
                 * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
                 */
                country: Address.Country | null;

                /**
                 * Address line 1 (e.g., street, PO Box, or company name).
                 */
                line1: string | null;

                /**
                 * Address line 2 (e.g., apartment, suite, unit, or building).
                 */
                line2: string | null;

                /**
                 * ZIP or postal code.
                 */
                postal_code: string | null;

                /**
                 * State, county, province, or region.
                 */
                state: string | null;

                /**
                 * Town or cho-me.
                 */
                town: string | null;
              }

              namespace Address {
                type Country =
                  | 'ad'
                  | 'ae'
                  | 'af'
                  | 'ag'
                  | 'ai'
                  | 'al'
                  | 'am'
                  | 'ao'
                  | 'aq'
                  | 'ar'
                  | 'as'
                  | 'at'
                  | 'au'
                  | 'aw'
                  | 'ax'
                  | 'az'
                  | 'ba'
                  | 'bb'
                  | 'bd'
                  | 'be'
                  | 'bf'
                  | 'bg'
                  | 'bh'
                  | 'bi'
                  | 'bj'
                  | 'bl'
                  | 'bm'
                  | 'bn'
                  | 'bo'
                  | 'bq'
                  | 'br'
                  | 'bs'
                  | 'bt'
                  | 'bv'
                  | 'bw'
                  | 'by'
                  | 'bz'
                  | 'ca'
                  | 'cc'
                  | 'cd'
                  | 'cf'
                  | 'cg'
                  | 'ch'
                  | 'ci'
                  | 'ck'
                  | 'cl'
                  | 'cm'
                  | 'cn'
                  | 'co'
                  | 'cr'
                  | 'cu'
                  | 'cv'
                  | 'cw'
                  | 'cx'
                  | 'cy'
                  | 'cz'
                  | 'de'
                  | 'dj'
                  | 'dk'
                  | 'dm'
                  | 'do'
                  | 'dz'
                  | 'ec'
                  | 'ee'
                  | 'eg'
                  | 'eh'
                  | 'er'
                  | 'es'
                  | 'et'
                  | 'fi'
                  | 'fj'
                  | 'fk'
                  | 'fm'
                  | 'fo'
                  | 'fr'
                  | 'ga'
                  | 'gb'
                  | 'gd'
                  | 'ge'
                  | 'gf'
                  | 'gg'
                  | 'gh'
                  | 'gi'
                  | 'gl'
                  | 'gm'
                  | 'gn'
                  | 'gp'
                  | 'gq'
                  | 'gr'
                  | 'gs'
                  | 'gt'
                  | 'gu'
                  | 'gw'
                  | 'gy'
                  | 'hk'
                  | 'hm'
                  | 'hn'
                  | 'hr'
                  | 'ht'
                  | 'hu'
                  | 'id'
                  | 'ie'
                  | 'il'
                  | 'im'
                  | 'in'
                  | 'io'
                  | 'iq'
                  | 'ir'
                  | 'is'
                  | 'it'
                  | 'je'
                  | 'jm'
                  | 'jo'
                  | 'jp'
                  | 'ke'
                  | 'kg'
                  | 'kh'
                  | 'ki'
                  | 'km'
                  | 'kn'
                  | 'kp'
                  | 'kr'
                  | 'kw'
                  | 'ky'
                  | 'kz'
                  | 'la'
                  | 'lb'
                  | 'lc'
                  | 'li'
                  | 'lk'
                  | 'lr'
                  | 'ls'
                  | 'lt'
                  | 'lu'
                  | 'lv'
                  | 'ly'
                  | 'ma'
                  | 'mc'
                  | 'md'
                  | 'me'
                  | 'mf'
                  | 'mg'
                  | 'mh'
                  | 'mk'
                  | 'ml'
                  | 'mm'
                  | 'mn'
                  | 'mo'
                  | 'mp'
                  | 'mq'
                  | 'mr'
                  | 'ms'
                  | 'mt'
                  | 'mu'
                  | 'mv'
                  | 'mw'
                  | 'mx'
                  | 'my'
                  | 'mz'
                  | 'na'
                  | 'nc'
                  | 'ne'
                  | 'nf'
                  | 'ng'
                  | 'ni'
                  | 'nl'
                  | 'no'
                  | 'np'
                  | 'nr'
                  | 'nu'
                  | 'nz'
                  | 'om'
                  | 'pa'
                  | 'pe'
                  | 'pf'
                  | 'pg'
                  | 'ph'
                  | 'pk'
                  | 'pl'
                  | 'pm'
                  | 'pn'
                  | 'pr'
                  | 'ps'
                  | 'pt'
                  | 'pw'
                  | 'py'
                  | 'qa'
                  | 'qz'
                  | 're'
                  | 'ro'
                  | 'rs'
                  | 'ru'
                  | 'rw'
                  | 'sa'
                  | 'sb'
                  | 'sc'
                  | 'sd'
                  | 'se'
                  | 'sg'
                  | 'sh'
                  | 'si'
                  | 'sj'
                  | 'sk'
                  | 'sl'
                  | 'sm'
                  | 'sn'
                  | 'so'
                  | 'sr'
                  | 'ss'
                  | 'st'
                  | 'sv'
                  | 'sx'
                  | 'sy'
                  | 'sz'
                  | 'tc'
                  | 'td'
                  | 'tf'
                  | 'tg'
                  | 'th'
                  | 'tj'
                  | 'tk'
                  | 'tl'
                  | 'tm'
                  | 'tn'
                  | 'to'
                  | 'tr'
                  | 'tt'
                  | 'tv'
                  | 'tw'
                  | 'tz'
                  | 'ua'
                  | 'ug'
                  | 'um'
                  | 'us'
                  | 'uy'
                  | 'uz'
                  | 'va'
                  | 'vc'
                  | 've'
                  | 'vg'
                  | 'vi'
                  | 'vn'
                  | 'vu'
                  | 'wf'
                  | 'ws'
                  | 'ye'
                  | 'yt'
                  | 'za'
                  | 'zm'
                  | 'zw';
              }

              interface DateOfBirth {
                /**
                 * The day of birth, between 1 and 31.
                 */
                day: number;

                /**
                 * The month of birth, between 1 and 12.
                 */
                month: number;

                /**
                 * The four-digit year of birth.
                 */
                year: number;
              }

              interface Documents {
                /**
                 * An identifying document showing the person's name, either a passport or local ID card.
                 */
                primary_verification: Documents.PrimaryVerification | null;

                /**
                 * A document showing address, either a passport, local ID card, or utility bill from a well-known utility company.
                 */
                secondary_verification: Documents.SecondaryVerification | null;
              }

              namespace Documents {
                interface PrimaryVerification {
                  /**
                   * The [file upload](https://docs.stripe.com/api/persons/update#create_file) tokens for the front and back of the verification document.
                   */
                  front_back: PrimaryVerification.FrontBack;

                  /**
                   * The format of the verification document. Currently supports `front_back` only.
                   */
                  type: 'front_back';
                }

                namespace PrimaryVerification {
                  interface FrontBack {
                    /**
                     * A [file upload](https://docs.stripe.com/api/persons/update#create_file) token representing the back of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
                     */
                    back: string;

                    /**
                     * A [file upload](https://docs.stripe.com/api/persons/update#create_file) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
                     */
                    front: string;
                  }
                }

                interface SecondaryVerification {
                  /**
                   * The [file upload](https://docs.stripe.com/api/persons/update#create_file) tokens for the front and back of the verification document.
                   */
                  front_back: SecondaryVerification.FrontBack;

                  /**
                   * The format of the verification document. Currently supports `front_back` only.
                   */
                  type: 'front_back';
                }

                namespace SecondaryVerification {
                  interface FrontBack {
                    /**
                     * A [file upload](https://docs.stripe.com/api/persons/update#create_file) token representing the back of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
                     */
                    back: string;

                    /**
                     * A [file upload](https://docs.stripe.com/api/persons/update#create_file) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
                     */
                    front: string;
                  }
                }
              }

              interface IdNumber {
                /**
                 * The ID number type of an individual.
                 */
                type: IdNumber.Type;
              }

              namespace IdNumber {
                type Type =
                  | 'ae_eid'
                  | 'br_cpf'
                  | 'hk_id'
                  | 'my_nric'
                  | 'sg_fin'
                  | 'sg_nric'
                  | 'th_lc'
                  | 'th_pin'
                  | 'us_itin'
                  | 'us_itin_last_4'
                  | 'us_ssn'
                  | 'us_ssn_last_4';
              }

              type LegalGender = 'female' | 'male';

              type Nationality =
                | 'ad'
                | 'ae'
                | 'af'
                | 'ag'
                | 'ai'
                | 'al'
                | 'am'
                | 'ao'
                | 'aq'
                | 'ar'
                | 'as'
                | 'at'
                | 'au'
                | 'aw'
                | 'ax'
                | 'az'
                | 'ba'
                | 'bb'
                | 'bd'
                | 'be'
                | 'bf'
                | 'bg'
                | 'bh'
                | 'bi'
                | 'bj'
                | 'bl'
                | 'bm'
                | 'bn'
                | 'bo'
                | 'bq'
                | 'br'
                | 'bs'
                | 'bt'
                | 'bv'
                | 'bw'
                | 'by'
                | 'bz'
                | 'ca'
                | 'cc'
                | 'cd'
                | 'cf'
                | 'cg'
                | 'ch'
                | 'ci'
                | 'ck'
                | 'cl'
                | 'cm'
                | 'cn'
                | 'co'
                | 'cr'
                | 'cu'
                | 'cv'
                | 'cw'
                | 'cx'
                | 'cy'
                | 'cz'
                | 'de'
                | 'dj'
                | 'dk'
                | 'dm'
                | 'do'
                | 'dz'
                | 'ec'
                | 'ee'
                | 'eg'
                | 'eh'
                | 'er'
                | 'es'
                | 'et'
                | 'fi'
                | 'fj'
                | 'fk'
                | 'fm'
                | 'fo'
                | 'fr'
                | 'ga'
                | 'gb'
                | 'gd'
                | 'ge'
                | 'gf'
                | 'gg'
                | 'gh'
                | 'gi'
                | 'gl'
                | 'gm'
                | 'gn'
                | 'gp'
                | 'gq'
                | 'gr'
                | 'gs'
                | 'gt'
                | 'gu'
                | 'gw'
                | 'gy'
                | 'hk'
                | 'hm'
                | 'hn'
                | 'hr'
                | 'ht'
                | 'hu'
                | 'id'
                | 'ie'
                | 'il'
                | 'im'
                | 'in'
                | 'io'
                | 'iq'
                | 'ir'
                | 'is'
                | 'it'
                | 'je'
                | 'jm'
                | 'jo'
                | 'jp'
                | 'ke'
                | 'kg'
                | 'kh'
                | 'ki'
                | 'km'
                | 'kn'
                | 'kp'
                | 'kr'
                | 'kw'
                | 'ky'
                | 'kz'
                | 'la'
                | 'lb'
                | 'lc'
                | 'li'
                | 'lk'
                | 'lr'
                | 'ls'
                | 'lt'
                | 'lu'
                | 'lv'
                | 'ly'
                | 'ma'
                | 'mc'
                | 'md'
                | 'me'
                | 'mf'
                | 'mg'
                | 'mh'
                | 'mk'
                | 'ml'
                | 'mm'
                | 'mn'
                | 'mo'
                | 'mp'
                | 'mq'
                | 'mr'
                | 'ms'
                | 'mt'
                | 'mu'
                | 'mv'
                | 'mw'
                | 'mx'
                | 'my'
                | 'mz'
                | 'na'
                | 'nc'
                | 'ne'
                | 'nf'
                | 'ng'
                | 'ni'
                | 'nl'
                | 'no'
                | 'np'
                | 'nr'
                | 'nu'
                | 'nz'
                | 'om'
                | 'pa'
                | 'pe'
                | 'pf'
                | 'pg'
                | 'ph'
                | 'pk'
                | 'pl'
                | 'pm'
                | 'pn'
                | 'pr'
                | 'ps'
                | 'pt'
                | 'pw'
                | 'py'
                | 'qa'
                | 'qz'
                | 're'
                | 'ro'
                | 'rs'
                | 'ru'
                | 'rw'
                | 'sa'
                | 'sb'
                | 'sc'
                | 'sd'
                | 'se'
                | 'sg'
                | 'sh'
                | 'si'
                | 'sj'
                | 'sk'
                | 'sl'
                | 'sm'
                | 'sn'
                | 'so'
                | 'sr'
                | 'ss'
                | 'st'
                | 'sv'
                | 'sx'
                | 'sy'
                | 'sz'
                | 'tc'
                | 'td'
                | 'tf'
                | 'tg'
                | 'th'
                | 'tj'
                | 'tk'
                | 'tl'
                | 'tm'
                | 'tn'
                | 'to'
                | 'tr'
                | 'tt'
                | 'tv'
                | 'tw'
                | 'tz'
                | 'ua'
                | 'ug'
                | 'um'
                | 'us'
                | 'uy'
                | 'uz'
                | 'va'
                | 'vc'
                | 've'
                | 'vg'
                | 'vi'
                | 'vn'
                | 'vu'
                | 'wf'
                | 'ws'
                | 'ye'
                | 'yt'
                | 'za'
                | 'zm'
                | 'zw';

              type PoliticalExposure = 'existing' | 'none';

              interface Relationship {
                /**
                 * Whether the individual is a director of the Account's legal entity. Directors are typically members of the governing board of the company, or responsible for ensuring the company meets its regulatory obligations.
                 */
                director: boolean | null;

                /**
                 * Whether the individual has significant responsibility to control, manage, or direct the organization.
                 */
                executive: boolean | null;

                /**
                 * Whether the individual is the legal guardian of the Account's representative.
                 */
                legal_guardian: boolean | null;

                /**
                 * Whether the individual is an owner of the Account's legal entity.
                 */
                owner: boolean | null;

                /**
                 * The percent owned by the individual of the Account's legal entity.
                 */
                percent_ownership: string | null;

                /**
                 * Whether the individual is authorized as the primary representative of the Account. This is the person nominated by the business to provide information about themselves, and general information about the account. There can only be one representative at any given time. At the time the account is created, this person should be set to the person responsible for opening the account.
                 */
                representative: boolean | null;

                /**
                 * The individual's title (e.g., CEO, Support Engineer).
                 */
                title: string | null;
              }
            }
          }

          interface Requirements {
            /**
             * A value indicating responsibility for collecting requirements on this account.
             */
            collector: Requirements.Collector;

            /**
             * A list of requirements for the Account.
             */
            entries: Array<Requirements.Entry> | null;
          }

          namespace Requirements {
            type Collector = 'application' | 'stripe';

            interface Entry {
              /**
               * Whether the responsibility is with the integrator or with Stripe (to review info, to wait for some condition, etc.) to action the requirement.
               */
              awaiting_action_from: Entry.AwaitingActionFrom;

              /**
               * Machine-readable string describing the requirement.
               */
              description: string;

              /**
               * Descriptions of why the requirement must be collected, or why the collected information isn't satisfactory to Stripe.
               */
              errors: Array<Entry.Error>;

              /**
               * A hash describing the impact of not collecting the requirement, or Stripe not being able to verify the collected information.
               */
              impact: Entry.Impact;

              /**
               * The soonest point when the account will be impacted by not providing the requirement.
               */
              minimum_deadline: Entry.MinimumDeadline;

              /**
               * A reference to the location of the requirement.
               */
              reference: Entry.Reference | null;

              /**
               * A list of reasons why Stripe is collecting the requirement.
               */
              requested_reasons: Array<Entry.RequestedReason>;
            }

            namespace Entry {
              type AwaitingActionFrom = 'stripe' | 'user';

              interface Error {
                /**
                 * Machine-readable code describing the error.
                 */
                code: string;

                /**
                 * Human-readable description of the error.
                 */
                description: string;
              }

              interface Impact {
                /**
                 * The Features that will be restricted if the requirement is not collected and satisfactory to Stripe.
                 */
                restricts_features: Array<Impact.RestrictsFeature> | null;

                /**
                 * Details about payouts restrictions that will be enforced if the requirement is not collected and satisfactory to Stripe.
                 */
                restricts_payouts: Impact.RestrictsPayouts | null;
              }

              namespace Impact {
                interface RestrictsFeature {
                  /**
                   * The configuration which specifies the Feature which will be restricted.
                   */
                  configuration: RestrictsFeature.Configuration;

                  /**
                   * Details about when in the account lifecycle the requirement must be collected by the avoid the Feature restriction.
                   */
                  deadline: RestrictsFeature.Deadline;

                  /**
                   * The name of the Feature which will be restricted.
                   */
                  feature: RestrictsFeature.Feature;
                }

                namespace RestrictsFeature {
                  type Configuration = 'customer' | 'merchant' | 'recipient';

                  interface Deadline {
                    /**
                     * The current status of the requirement's impact.
                     */
                    status: Deadline.Status;
                  }

                  namespace Deadline {
                    type Status =
                      | 'currently_due'
                      | 'eventually_due'
                      | 'past_due';
                  }

                  type Feature =
                    | 'automatic_indirect_tax'
                    | 'card_payments'
                    | 'stripe_balance.stripe_transfers';
                }

                interface RestrictsPayouts {
                  /**
                   * Details about when in the Account's lifecycle the requirement must be collected by the avoid the earliest specified impact.
                   */
                  deadline: RestrictsPayouts.Deadline;
                }

                namespace RestrictsPayouts {
                  interface Deadline {
                    /**
                     * The current status of the requirement's impact.
                     */
                    status: Deadline.Status;
                  }

                  namespace Deadline {
                    type Status =
                      | 'currently_due'
                      | 'eventually_due'
                      | 'past_due';
                  }
                }
              }

              interface MinimumDeadline {
                /**
                 * The current status of the requirement's impact.
                 */
                status: MinimumDeadline.Status;
              }

              namespace MinimumDeadline {
                type Status = 'currently_due' | 'eventually_due' | 'past_due';
              }

              interface Reference {
                /**
                 * If `inquiry` is the type, the inquiry token.
                 */
                inquiry: string | null;

                /**
                 * If `resource` is the type, the resource token.
                 */
                resource: string | null;

                /**
                 * The type of the reference. An additional hash is included with a name matching the type. It contains additional information specific to the type.
                 */
                type: Reference.Type;
              }

              namespace Reference {
                type Type = 'inquiry' | 'resource';
              }

              interface RequestedReason {
                /**
                 * Machine-readable description of Stripe's reason for collecting the requirement.
                 */
                code: RequestedReason.Code;
              }

              namespace RequestedReason {
                type Code =
                  | 'future_requirements'
                  | 'routine_onboarding'
                  | 'routine_verification';
              }
            }
          }
        }
      }
    }
  }
}
