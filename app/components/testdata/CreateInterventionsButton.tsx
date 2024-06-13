import {Button} from '@/components/ui/button';
import {LoaderCircle, Plus} from 'lucide-react';
import React from 'react';

export default function CreateInterventionsButton({
  classes,
}: {
  classes?: string;
}) {
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const onClick = async () => {
    setButtonLoading(true);
    try {
      const res = await fetch('/api/setup_accounts/create_risk_intervention', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setButtonLoading(false);
        window.location.reload();
      }
    } catch (e) {
      console.log('Error with creating test intervention: ', e);
    }
  };
  return (
    <Button
      className={`${classes || 'text-sm rounded-lg border border-[#D8DEE4] py-1 font-medium shadow'}`}
      variant="secondary"
      onClick={onClick}
      disabled={buttonLoading}
    >
      Create test risk intervention
      {buttonLoading && (
        <LoaderCircle className="ml-2 animate-spin items-center" size={20} />
      )}
    </Button>
  );
}
