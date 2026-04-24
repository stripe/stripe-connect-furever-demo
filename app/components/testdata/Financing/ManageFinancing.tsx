import {Form} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ManageFinancingOfferFormField} from './ManageFinancingOfferFormField';
import {
  enumValueToSentenceCase,
  FinancingOfferProductType,
  TestmodeFinancingForm,
  OfferState,
  TestmodeFinancingFormType,
} from './types';
import {
  STATES_FOR_PRODUCT_TYPE,
  FINANCING_OFFER_PRODUCT_TYPES_ARRAY,
  PRODUCT_TYPE_CREATE_URLS,
  LINE_OF_CREDIT_PRODUCT_TYPES_ARRAY,
} from './constants';
import {TransitionFinancingButton} from './TransitionFinancingButton';
import {Link} from '@/components/ui/link';
import {ExternalLinkIcon} from '@radix-ui/react-icons';
import {CapitalAccountLinkButton} from './CapitalAccountLinkButton';
import {
  useFinancingOfferFetchQuery,
  useLineOfCreditSummaryFetchQuery,
} from './financingQueryHooks';

export default function ManageFinancing({classes}: {classes?: string}) {
  const [offerState, setOfferState] = React.useState<OfferState | undefined>(
    undefined
  );

  const form = useForm<TestmodeFinancingForm>({
    defaultValues: {
      financingOfferType: 'flex_loan',
      offerState: 'delivered',
    },
  });

  const {
    isLoading: financingOfferLoading,
    error: financingOfferError,
    data: financingOffer,
    refetch: refetchFinancingData,
  } = useFinancingOfferFetchQuery();

  const {
    isLoading: lineOfCreditSummaryLoading,
    error: lineOfCreditSummaryError,
    data: lineOfCreditSummary,
    refetch: refetchLineOfCreditSummary,
  } = useLineOfCreditSummaryFetchQuery();

  const queriesLoading = financingOfferLoading || lineOfCreditSummaryLoading;
  const hasLineOfCreditFeature =
    !lineOfCreditSummaryLoading && !lineOfCreditSummaryError;
  const hasLineOfCreditLine =
    !lineOfCreditSummaryLoading &&
    !lineOfCreditSummaryError &&
    lineOfCreditSummary?.line_of_credit !== null;

  const offerStateRef = React.useRef<OfferState | undefined>(undefined);
  if (!financingOfferLoading && !financingOfferError) {
    offerStateRef.current = financingOffer?.offer?.status || 'no_offer';
    if (offerStateRef.current != offerState) {
      setOfferState(offerStateRef.current);
    }
  }

  const formFinancingOfferType = form.watch('financingOfferType');
  const formOfferState = form.watch('offerState');

  const offerStateToFormType: {
    [key in OfferState]: TestmodeFinancingFormType | undefined;
  } = {
    no_offer: 'create',
    fully_repaid: 'create',
    rejected: 'create',
    canceled: 'create',
    completed: 'create',
    expired: 'create',
    revoked: 'create',

    accepted: 'approve_reject',
    paid_out: 'fully_repay',

    undelivered: 'expire',
    delivered: 'expire',
  };

  const formType = offerStateToFormType[offerState || 'no_offer'];
  const createUrl = PRODUCT_TYPE_CREATE_URLS[formFinancingOfferType];

  const showCreateFinancingOfferForm =
    offerState && (formType === 'approve_reject' || !hasLineOfCreditLine);

  const supportedProductTypes = FINANCING_OFFER_PRODUCT_TYPES_ARRAY;

  return (
    <div className="flex flex-col gap-8">
      {showCreateFinancingOfferForm && (
        <div className="flex flex-col gap-2">
          <div className="gap-2 text-sm font-bold">Create financing offer</div>
          <Form {...form}>
            {formType === 'create' && (
              <>
                <ManageFinancingOfferFormField
                  name="financingOfferType"
                  label={
                    <div>
                      <Link
                        href="https://docs.stripe.com/capital/how-capital-for-platforms-works#types-of-financing-offers"
                        target="_blank"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        {'Product Type'}
                        <ExternalLinkIcon className="h-3 w-3" />
                      </Link>
                    </div>
                  }
                  form={form}
                  loading={queriesLoading}
                  render={({field}) => {
                    return (
                      <Select
                        {...field}
                        onValueChange={(val) => {
                          const newFinancingOfferType =
                            val as FinancingOfferProductType;
                          form.setValue(
                            'financingOfferType',
                            newFinancingOfferType
                          );

                          const statesForProductType =
                            STATES_FOR_PRODUCT_TYPE[newFinancingOfferType];

                          // If the product type changes and the offer state is not valid for the new product type, set the offer state to the first valid state for the new product type
                          if (!statesForProductType.includes(formOfferState)) {
                            form.setValue(
                              'offerState',
                              statesForProductType[0]
                            );
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className="w-[120px] text-xs"
                          disabled={queriesLoading}
                        >
                          <SelectValue className="text-xs">
                            {enumValueToSentenceCase(field.value)}
                          </SelectValue>
                        </SelectTrigger>

                        <SelectContent className="z-[100] text-xs">
                          {supportedProductTypes.map((productType) => (
                            <SelectItem
                              value={productType}
                              key={productType}
                              className="z-[130] text-xs"
                              disabled={
                                !hasLineOfCreditFeature &&
                                LINE_OF_CREDIT_PRODUCT_TYPES_ARRAY.includes(
                                  productType as any
                                )
                              }
                            >
                              {enumValueToSentenceCase(productType)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
                <ManageFinancingOfferFormField
                  name="offerState"
                  label="Offer State"
                  form={form}
                  loading={queriesLoading}
                  render={({field}) => {
                    return (
                      <Select
                        {...field}
                        onValueChange={(val) =>
                          form.setValue('offerState', val as OfferState)
                        }
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className="w-[120px] text-xs"
                          disabled={queriesLoading}
                        >
                          <SelectValue className="text-xs">
                            {enumValueToSentenceCase(field.value)}
                          </SelectValue>
                        </SelectTrigger>

                        <SelectContent className="z-[100] text-xs">
                          {STATES_FOR_PRODUCT_TYPE[
                            form.watch('financingOfferType')
                          ].map((productType) => (
                            <SelectItem
                              value={productType}
                              key={productType}
                              className="z-[100] text-xs"
                            >
                              {enumValueToSentenceCase(productType)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />

                <TransitionFinancingButton
                  label={'Create'}
                  fetchUrl={createUrl}
                  fetchBody={{
                    offerState: form.watch('offerState'),
                  }}
                  form={form}
                />
              </>
            )}
            {formType === 'expire' && (
              <TransitionFinancingButton
                label={'Expire offer'}
                fetchUrl="/api/capital/expire_test_financing"
                form={form}
              />
            )}

            {formType === 'approve_reject' && (
              <>
                <TransitionFinancingButton
                  label={'Approve financing application'}
                  fetchUrl="/api/capital/approve_test_financing"
                  classes={classes}
                />
                <TransitionFinancingButton
                  label={'Reject financing application'}
                  fetchUrl="/api/capital/reject_test_financing"
                  classes={classes}
                  form={form}
                />
              </>
            )}

            {formType === 'fully_repay' && (
              <TransitionFinancingButton
                label={'Fully repay financing'}
                fetchUrl="/api/capital/fully_repay_test_financing"
                classes={classes}
                form={form}
              />
            )}
          </Form>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div className="gap-2 text-sm font-bold">
          Stripe Hosted Capital
          <div>
            <Link
              href="https://docs.stripe.com/api/account_links/create?rds=1#create_account_link-type"
              className="text-xs"
              target="_blank"
            >
              Account Links API Documentation
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <CapitalAccountLinkButton type="capital_financing_offer" />
          <CapitalAccountLinkButton type="capital_financing_reporting" />
        </div>
      </div>
    </div>
  );
}
