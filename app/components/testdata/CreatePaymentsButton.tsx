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
      count: '1',
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`${classes || 'border'}`} variant="ghost" size="sm">
          Create test payments
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 text-primary sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create test payments</DialogTitle>
          <DialogDescription>
            Simulate a grooming session by using a testmode payment method to{' '}
            <a
              target="blank"
              className="font-medium text-accent"
              href="https://stripe.com/docs/api/payment_intents"
            >
              create a payment intent
            </a>
            .
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="count"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Number of payments</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue>{field.value}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 10}, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        $
                      </div>
                      <Input
                        {...field}
                        placeholder="Leave blank for a random amount"
                        className="pl-7"
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Payment status</FormLabel>
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
            <div className="flew-row flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="default" type="submit" disabled={loading}>
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
      </DialogContent>
    </Dialog>
  );
}
