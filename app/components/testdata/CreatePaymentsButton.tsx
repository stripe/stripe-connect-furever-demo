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
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Label} from '@/components/ui/label';
import {Link} from '@/components/ui/link';

const formSchema = z.object({
  count: z.string(),
  amount: z.string(),
  status: z.string(),
  currency: z.string(),
});

export default function CreatePaymentsButton() {
  const CreatePaymentsForms = () => {
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
            <div className="flew-row flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create test payments</Button>
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
