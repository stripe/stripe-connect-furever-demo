'use client';

import * as React from 'react';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
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

const businessTypes = [
  'independent_salon',
  'chain_of_salons',
  'other',
] as const;
const businessTypeLabels = {
  independent_salon: 'Independent salon',
  chain_of_salons: 'Chain of salons',
  other: 'Other',
};

const countries = ['US', 'CA'] as const;
const countryLabels = {
  US: 'United States',
  CA: 'Canada',
};

const stripeDashboardAccess = ['none', 'full', 'express'] as const;
const stripeDashboardAccessLabels = {
  none: 'No access for connected accounts',
  full: 'Full access for connected accounts',
  express: 'Express access for connected accounts',
};

const paymentLosses = ['stripe', 'application'] as const;
const paymentLossesLabels = {
  stripe: 'Stripe',
  application: 'Furever',
};

const feePayer = ['account', 'application'] as const;
const feePayerLabels = {
  account: 'Stripe collects fees from connected accounts',
  application: 'Stripe collects fees from Furever',
};

const formSchema = z.object({
  businessType: z.enum(businessTypes),
  businessName: z.string().min(3),
  country: z.enum(countries),
  stripeDashboardAccess: z.enum(stripeDashboardAccess),
  paymentLosses: z.enum(paymentLosses),
  feePayer: z.enum(feePayer),
});

export default function BusinessDetailsForm({email}: {email: string}) {
  const router = useRouter();
  const [showMoreOptions, setShowMoreOptions] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: 'independent_salon',
      businessName: '',
      country: 'US',
      stripeDashboardAccess: 'none',
      paymentLosses: 'stripe',
      feePayer: 'account',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn('createaccount', {
        email: email,
        businessType: values.businessType,
        businessName: values.businessName,
        country: values.country,
        stripeDashboardAccess: values.stripeDashboardAccess,
        paymentLosses: values.paymentLosses,
        feePayer: values.feePayer,
        redirect: false,
      });

      router.push('/onboarding');
    } catch (error: any) {
      console.error('An error occured', error);
    }
  };

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
                name="stripeDashboardAccess"
                render={({field}) => (
                  <>
                    <FormLabel className="text-base font-bold text-primary">
                      Stripe dashboard access
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {stripeDashboardAccessLabels[field.value]}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {stripeDashboardAccess.map((option) => (
                            <SelectItem key={option} value={option}>
                              {stripeDashboardAccessLabels[option]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {paymentLossesLabels[field.value]}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {paymentLosses.map((option) => (
                            <SelectItem key={option} value={option}>
                              {paymentLossesLabels[option]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {feePayerLabels[field.value]}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {feePayer.map((option) => (
                            <SelectItem key={option} value={option}>
                              {feePayerLabels[option]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                  {' '}
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
