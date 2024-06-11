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
          <SelectItem key={key} value={CurrencyOptions[key as Currency]}>
            {CurrencyOptions[key as Currency]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function CreatePaymentsButton() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('creating payments');
    const data = {
      count: values.count,
      amount: values.amount,
      status: values.status,
      currency: values.currency,
    };

    const response = await fetch('/setup_accounts/create_charges', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // Handle errors on the client side here
      const {error} = await response.json();
      console.warn('An error occurred: ', error);
      return undefined;
    } else {
      setOpen(false);
      router.refresh();
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
                            <SelectItem
                              key={key}
                              value={statusLabels[key as PMType]}
                            >
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
          </form>
        </Form>
      </>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="my-1 rounded-lg border border-[#D8DEE4] bg-white py-1 text-sm font-medium shadow"
          variant="secondary"
        >
          Create test payments
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create test payments</DialogTitle>
          <DialogDescription>
            Simulate a grooming session by using a testmode payment method to{' '}
            <Link
              href="https://stripe.com/docs/api/payment_intents"
              target="_blank"
              underline="none"
            >
              create a payment intent
            </Link>
          </DialogDescription>
        </DialogHeader>
        <CreatePaymentsForm />
        <DialogFooter>
          <Button variant="default" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
