import Link from 'next/link';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import React from 'react';
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
import bcrypt from 'bcryptjs';

const formSchema = z.object({
  password: z.string().min(8),
});

const EditPasswordButton = () => {
  const [open, setOpen] = React.useState(false);

  const EditAccountForm = () => {
    const {data: session} = useSession();

    if (!session) {
      redirect('/home');
    }

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        password: '',
      },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      console.log('submitting');
      const data = {
        newPassword: bcrypt.hashSync(values.password, 8),
        changedPassword: true,
      };

      const response = await fetch('/api/password_update', {
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
        window.location.reload();
      }
    };

    return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-md border border-gray-300 p-2 placeholder:text-gray-400"
                        placeholder={'password'}
                        type="password"
                        {...field}
                      />
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
                Update
              </Button>
            </div>
          </form>
        </Form>
      </>
    );
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Link href="#">Edit password</Link>
      </DialogTrigger>
      <DialogContent className="text-primary">
        <DialogHeader>
          <DialogTitle>Edit password</DialogTitle>
        </DialogHeader>
        <EditAccountForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditPasswordButton;
