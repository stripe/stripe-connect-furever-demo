import {Button} from '@/components/ui/button';
import {ExternalLinkIcon} from '@radix-ui/react-icons';
import {LoaderCircle} from 'lucide-react';
import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {OfferState} from './types';

export function CapitalAccountLinkButton({
  type,
}: {
  type: 'capital_financing_offer' | 'capital_financing_reporting';
}) {
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const onClick = async () => {
    setButtonLoading(true);
    try {
      const url = new URL('/api/capital/account_link', window.location.origin);
      url.searchParams.set('shouldRedirect', 'false');

      url.searchParams.set('type', type);

      const res = await fetch(url, {
        method: 'GET',
      });

      const accountLink = (await res.json()).url;
      setButtonLoading(false);

      window.open(accountLink, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.log('Error attempting to create capital account link: ', e);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <Button onClick={onClick} className="border text-xs" variant="secondary">
      {!buttonLoading && (
        <div className="flex items-center gap-x-1">
          {type === 'capital_financing_offer' ? 'Offer ' : 'Reporting '}
          dashboard
          <ExternalLinkIcon className="h-3 w-3" />
        </div>
      )}
      {buttonLoading && (
        <LoaderCircle className="ml-2 animate-spin items-center" size={20} />
      )}
    </Button>
  );
}
