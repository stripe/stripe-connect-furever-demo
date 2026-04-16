import {Button} from '@/components/ui/button';
import {LoaderCircle} from 'lucide-react';
import React from 'react';
import {UseFormReturn} from 'react-hook-form';

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
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const onClick = async () => {
    setButtonLoading(true);
    try {
      const res = await fetch(fetchUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fetchBody),
      });
      setButtonLoading(false);

      if (res.ok) {
        window.location.reload();
      }
    } catch (e) {
      console.log(`Error attempting to \`${label}\`: `, e);
      setButtonLoading(false);
    }
  };

  return (
    <Button
      className={`${classes || 'border'}`}
      variant="secondary"
      onClick={form ? form.handleSubmit(onClick) : onClick}
      disabled={buttonLoading}
      size="sm"
    >
      {label}
      {buttonLoading && (
        <LoaderCircle className="ml-2 animate-spin items-center" size={20} />
      )}
    </Button>
  );
}
