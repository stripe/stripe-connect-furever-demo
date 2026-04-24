import {Button} from '@/components/ui/button';
import {LoaderCircle} from 'lucide-react';
import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';

export function TransitionFinancingButton({
  classes,
  label,
  fetchUrl,
  fetchMethod: method = 'POST',
  fetchBody = {},
  form,
}: {
  label: string;
  fetchUrl: string;
  classes?: string;
  fetchMethod?: string;
  fetchBody?: {};
  form?: UseFormReturn<any>;
}) {
  const {mutateAsync, isPending} = useMutation({
    mutationFn: async () => {
      const res = await fetch(fetchUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fetchBody),
      });
      // Wait for 2 seconds to allow for side effects to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Failed to transition financing', {
          cause: res.text(),
        });
      }
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
  const onClick = async () => {
    await mutateAsync();
  };

  return (
    <Button
      className={`${classes || 'border'}`}
      variant="secondary"
      onClick={form ? form.handleSubmit(onClick) : onClick}
      disabled={isPending}
      size="sm"
    >
      {label}
      {isPending && (
        <LoaderCircle className="ml-2 animate-spin items-center" size={20} />
      )}
    </Button>
  );
}
