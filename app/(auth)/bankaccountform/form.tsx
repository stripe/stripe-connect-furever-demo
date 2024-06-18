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

const formSchema = z.object({
  accountName: z.string().min(1),
  accountType: z.string(),
  country: z.string(),
  currency: z.string(),
  accountNumber: z.string().min(1),
  routingNumber: z.string(),
});

export default function BankAccountForm() {
  const router = useRouter();
  const [error, setError] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: '',
      accountType: 'individual',
      country: 'US',
      currency: 'usd',
      accountNumber: '',
      routingNumber: '110000000',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    const data = {
      country: values.country,
      currency: values.currency,
      account_holder_name: values.accountName,
      account_holder_type: values.accountType,
      routing_number: values.routingNumber,
      account_number: values.accountNumber,
    };

    const response = await fetch('/api/setup_accounts/create_bank_account', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // Handle errors on the client side here
      console.warn('An error occurred: ', error);
      setError(true);
      setSubmitting(false);
      return undefined;
    } else {
      setError(false);
      router.push('/home?shownux=true');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="accountName"
            render={({field}) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 p-2 placeholder:text-gray-400"
                    placeholder="Jenny Rosen"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="accountType"
            render={({field}) => (
              <FormItem>
                <FormLabel>Account Holder Type</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 p-2 placeholder:text-gray-400"
                    placeholder="individual"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="country"
            render={({field}) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 p-2 placeholder:text-gray-400"
                    placeholder="US"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="currency"
            render={({field}) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 p-2 placeholder:text-gray-400"
                    placeholder="usd"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="routingNumber"
            render={({field}) => (
              <FormItem>
                <FormLabel>Routing Number</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 p-2 placeholder:text-gray-400"
                    placeholder="110000000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="accountNumber"
            render={({field}) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 p-2 placeholder:text-gray-400"
                    placeholder="000123456789"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={'w-full rounded-md font-bold text-white'}
        >
          {!submitting ? (
            <div className="flex items-center gap-2 text-base font-medium">
              <p>Create bank account</p>
              <ArrowRight size={20} />
            </div>
          ) : (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
            </>
          )}
        </Button>
        {error && (
          <div className="text-xs text-red-500">
            {' '}
            An error occurred. Please try again using a test account number.{' '}
          </div>
        )}
      </form>
    </Form>
  );
}
