'use client';

import * as React from 'react';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {ControllerRenderProps, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Collapsible} from '@/components/ui/collapsible';
import {ChevronUp, ChevronDown, ArrowRight, Loader2} from 'lucide-react';
import {Link} from '@/components/ui/link';
import {
  businessTypes,
  countries,
  stripeDashboardTypes,
  paymentLosses,
  feePayers,
} from '@/types/account';
import type {FeePayer, StripeDashboardType} from '@/types/account';

const businessTypeLabels = {
  independent_salon: 'Independent salon',
  chain_of_salons: 'Chain of salons',
  other: 'Other',
};

const countryLabels = {
  US: 'United States',
  CA: 'Canada',
};

const stripeDashboardTypeLabels = {
  none: 'No access for connected accounts',
  full: 'Full Stripe Dashboard',
  express: 'Express Dashboard',
};

const paymentLossesLabels = {
  stripe: 'Stripe',
  application: 'Furever',
};

const feePayerLabels = {
  account: 'Stripe collects fees from connected accounts',
  application: 'Stripe collects fees from Furever',
};

const formSchema = z.object({
  businessType: z.enum(businessTypes),
  businessName: z.string().min(3),
  country: z.enum(countries),
  stripeDashboardType: z.enum(stripeDashboardTypes),
  paymentLosses: z.enum(paymentLosses),
  feePayer: z.enum(feePayers),
});

function StripeFeeCollectionSelect({
  field,
  feePayerLabels,
  validFeePayers,
}: {
  field: ControllerRenderProps<z.infer<typeof formSchema>, 'feePayer'>;
  feePayerLabels: Record<string, string>;
  validFeePayers: readonly FeePayer[];
}) {
  return (
    <Select {...field} onValueChange={(value) => field.onChange(value)}>
      <SelectTrigger>
        <SelectValue>{feePayerLabels[field.value]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {feePayers.map((option) => (
          <SelectItem
            key={option}
            value={option}
            disabled={!validFeePayers.includes(option)}
          >
            {feePayerLabels[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NegativeBalanceLiabilitySelect({
  field,
  validPaymentLosses,
}: {
  field: ControllerRenderProps<z.infer<typeof formSchema>, 'paymentLosses'>;
  validPaymentLosses: readonly string[];
}) {
  return (
    <Select {...field} onValueChange={(value) => field.onChange(value)}>
      <SelectTrigger>
        <SelectValue>{paymentLossesLabels[field.value]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {paymentLosses.map((option) => (
          <SelectItem
            key={option}
            value={option}
            disabled={!validPaymentLosses.includes(option)}
          >
            {paymentLossesLabels[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function StripeDashboardTypeSelect({
  field,
  stripeDashboardTypes,
  stripeDashboardTypeLabels,
}: {
  field: ControllerRenderProps<
    z.infer<typeof formSchema>,
    'stripeDashboardType'
  >;
  stripeDashboardTypes: readonly StripeDashboardType[];
  stripeDashboardTypeLabels: Record<StripeDashboardType, string>;
}) {
  return (
    <Select {...field} onValueChange={(value) => field.onChange(value)}>
      <SelectTrigger>
        <SelectValue>{stripeDashboardTypeLabels[field.value]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {stripeDashboardTypes.map((option) => (
          <SelectItem key={option} value={option}>
            {stripeDashboardTypeLabels[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function BusinessDetailsForm({email}: {email: string}) {
  const router = useRouter();
  const [showMoreOptions, setShowMoreOptions] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: 'independent_salon',
      businessName: '',
      country: 'US',
      stripeDashboardType: 'none',
      paymentLosses: 'stripe',
      feePayer: 'account',
    },
  });

  const watchAccountControllerProperties = form.watch([
    'stripeDashboardType',
    'paymentLosses',
    'feePayer',
  ]);
  React.useEffect(() => {
    if (
      form.getValues('stripeDashboardType') === 'full' &&
      (form.getValues('paymentLosses') !== 'stripe' ||
        form.getValues('feePayer') !== 'account')
    ) {
      form.setValue('paymentLosses', 'stripe');
      form.setValue('feePayer', 'account');
    } else if (
      form.getValues('stripeDashboardType') === 'express' &&
      (form.getValues('paymentLosses') !== 'application' ||
        form.getValues('feePayer') !== 'application')
    ) {
      form.setValue('paymentLosses', 'application');
      form.setValue('feePayer', 'application');
    } else {
      if (
        form.getValues('paymentLosses') === 'application' &&
        form.getValues('feePayer') !== 'application'
      ) {
        form.setValue('feePayer', 'application');
      }
    }
  }, [form, watchAccountControllerProperties]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn('createaccount', {
        email: email,
        businessType: values.businessType,
        businessName: values.businessName,
        country: values.country,
        stripeDashboardType: values.stripeDashboardType,
        paymentLosses: values.paymentLosses,
        feePayer: values.feePayer,
        redirect: false,
      });

      router.push('/onboarding');
    } catch (error: any) {
      console.error('An error occured', error);
    }
  };

  const formValues = form.getValues();
  const validPaymentLosses = paymentLosses.filter((option) => {
    if (option === 'application') {
      return formValues.stripeDashboardType !== 'full';
    } else if (option === 'stripe') {
      return formValues.stripeDashboardType !== 'express';
    }
  });
  const validFeePayers = feePayers.filter((option) => {
    if (option === 'application') {
      return formValues.stripeDashboardType !== 'full';
    } else if (option === 'account') {
      return (
        formValues.stripeDashboardType === 'full' ||
        (formValues.stripeDashboardType === 'none' &&
          formValues.paymentLosses === 'stripe')
      );
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 w-[448px] space-y-4"
      >
        <div className="flex flex-col gap-y-6">
          <div>
            <FormField
              control={form.control}
              name="businessType"
              render={({field}) => (
                <>
                  <FormLabel className="text-base font-bold text-primary">
                    Business type
                  </FormLabel>
                  {businessTypes.map((option) => (
                    <FormItem key={option}>
                      <div className="mt-2 flex h-5 flex-row items-start justify-items-start space-x-2">
                        <FormControl>
                          <Input
                            {...field}
                            className="h-[14px] w-[14px] rounded-md border border-gray-300 placeholder:text-gray-400"
                            type="radio"
                            value={option}
                            checked={field.value === option}
                          />
                        </FormControl>
                        <FormLabel>{businessTypeLabels[option]}</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  ))}
                </>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="businessName"
              render={({field}) => (
                <>
                  <FormLabel className="text-base font-bold text-primary">
                    Business name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="mt-1 rounded-md border border-gray-300 placeholder:text-gray-400"
                    />
                  </FormControl>
                </>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="country"
              render={({field}) => (
                <>
                  <FormLabel className="text-base font-bold text-primary">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue>{countryLabels[field.value]}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((option) => (
                          <SelectItem key={option} value={option}>
                            {countryLabels[option]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </>
              )}
            />
          </div>
          <Link
            className="flex"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
          >
            <h3>More options</h3>
            {showMoreOptions && <ChevronUp className="ml-2" />}
            {!showMoreOptions && <ChevronDown className="ml-2" />}
          </Link>

          <Collapsible open={showMoreOptions}>
            <p>
              These options allow you to configure your connected account&apos;s
              controller properties
            </p>
            <div>
              <FormField
                control={form.control}
                name="stripeDashboardType"
                render={({field}) => (
                  <>
                    <FormLabel className="text-base font-bold text-primary">
                      Stripe dashboard access
                    </FormLabel>
                    <FormControl>
                      <StripeDashboardTypeSelect
                        field={field}
                        stripeDashboardTypes={stripeDashboardTypes}
                        stripeDashboardTypeLabels={stripeDashboardTypeLabels}
                      />
                    </FormControl>
                  </>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="paymentLosses"
                render={({field}) => (
                  <>
                    <FormLabel className="text-base font-bold text-primary">
                      Negative balance liability
                    </FormLabel>
                    <FormControl>
                      <NegativeBalanceLiabilitySelect
                        field={field}
                        validPaymentLosses={validPaymentLosses}
                      />
                    </FormControl>
                  </>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="feePayer"
                render={({field}) => (
                  <>
                    <FormLabel className="text-base font-bold text-primary">
                      Stripe fee collection
                    </FormLabel>
                    <FormControl>
                      <StripeFeeCollectionSelect
                        field={field}
                        feePayerLabels={feePayerLabels}
                        validFeePayers={validFeePayers}
                      />
                    </FormControl>
                  </>
                )}
              />
            </div>
          </Collapsible>
          <div>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className={
                'w-full rounded-md bg-accent py-3 font-bold text-white'
              }
            >
              {form.formState.isSubmitting ||
              form.formState.isSubmitSuccessful ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </>
              ) : (
                <>
                  <p className="pr-[6px] text-sm">Continue</p>
                  <ArrowRight size="16" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
