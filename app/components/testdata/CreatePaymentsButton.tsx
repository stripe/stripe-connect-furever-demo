'use client';

import * as React from 'react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
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
import {zodResolver} from '@hookform/resolvers/zod';
import {ControllerRenderProps, useForm} from 'react-hook-form';
import {Label} from '@/components/ui/label';
import {Link} from '@/components/ui/link';
import {z} from 'zod';
import {redirect, useRouter} from 'next/navigation';
import {LoaderCircle} from 'lucide-react';

const formSchema = z.object({
  count: z.string(),
  amount: z.string(),
  status: z.string(),
  currency: z.string(),
});

type PMType =
  | 'card_successful'
  | 'card_successful_intl'
  | 'card_disputed_fraudulent'
  | 'card_disputed_product_not_received'
  | 'card_disputed_inquiry'
  | 'card_uncaptured'
  | 'ach_direct_debit'
  | 'sepa_debit';

const statusLabels: Record<PMType, string> = {
  card_successful: 'Successful',
  card_successful_intl: 'Successful (Non-US country)',
  card_disputed_fraudulent: 'Disputed (fraudulent)',
  card_disputed_product_not_received: 'Disputed (product not received)',
  card_disputed_inquiry: 'Disputed (inquiry)',
  card_uncaptured: 'Uncaptured',
  ach_direct_debit: 'ACH Direct Debit',
  sepa_debit: 'SEPA Direct Debit',
};

type Currency =
  | 'aed'
  | 'aud'
  | 'cad'
  | 'cny'
  | 'eur'
  | 'gbp'
  | 'inr'
  | 'jpy'
  | 'sgd'
  | 'usd';
const CurrencyOptions: Record<Currency, string> = {
  aed: 'AED',
  aud: 'AUD',
  cad: 'CAD',
  cny: 'CNY',
  eur: 'EUR',
  gbp: 'GBP',
  inr: 'INR',
  jpy: 'JPY',
  sgd: 'SGD',
  usd: 'USD',
};

function CurrencySelect({
  field,
}: {
  field: ControllerRenderProps<z.infer<typeof formSchema>, 'currency'>;
}) {
  return (
    <Select {...field} onValueChange={(value) => field.onChange(value)}>
      <SelectTrigger className="mt-1">
        <SelectValue>{CurrencyOptions[field.value as Currency]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.keys(CurrencyOptions).map((key) => (
          <SelectItem key={key} value={key}>
            {CurrencyOptions[key as Currency]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function CreatePaymentsButton({classes}: {classes?: string}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      count: '',
      amount: '',
      status: 'card_successful',
      currency: 'usd',
    },
  });

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log('creating payments with data: ', values);
    const data = {
      count: values.count,
      amount: values.amount,
      status: values.status,
      currency: values.currency,
    };

    const response = await fetch('/api/setup_accounts/create_charges', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle errors on the client side here
      const {error} = await response.json();
      console.warn('An error occurred: ', error);
      return undefined;
    } else {
      setLoading(false);
      setOpen(false);
      window.location.reload();
    }
  };

  const CreatePaymentsForm = () => {
    return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <FormField
                control={form.control}
                name="count"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Count</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pb-3">
              <FormField
                control={form.control}
                name="amount"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pb-3">
              <FormField
                control={form.control}
                name="status"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue>
                            {statusLabels[field.value as PMType]}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(statusLabels).map((key: string) => (
                            <SelectItem key={key} value={key}>
                              {statusLabels[key as PMType]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pb-3">
              <FormField
                control={form.control}
                name="currency"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <CurrencySelect field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flew-row flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="default" type="submit">
                Create payments{' '}
                {loading && (
                  <LoaderCircle
                    className="ml-2 animate-spin items-center"
                    size={20}
                  />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${classes || 'text-md my-1 rounded-lg border border-[#D8DEE4] py-1 font-medium shadow'}`}
          variant="secondary"
        >
          Create test payments
        </Button>
      </DialogTrigger>
      <DialogContent className="text-primary sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create test payments</DialogTitle>
          <DialogDescription>
            Simulate a grooming session by using a testmode payment method to{' '}
            <Link href="https://stripe.com/docs/api/payment_intents">
              create a payment intent
            </Link>
          </DialogDescription>
        </DialogHeader>
        <CreatePaymentsForm />
      </DialogContent>
    </Dialog>
  );
}
