'use client';

import * as React from 'react';
import {useRouter} from 'next/navigation';
import {
  Home as HomeIcon,
  Wallet as WalletIcon,
  Coins as CoinsIcon,
  Landmark as LandmarkIcon,
  Settings as SettingsIcon,
} from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import CreateReceivedCredit from '@/app/components/debug/commands/CreateReceivedCredit';
import CreateIssuingCardAuthorization from '@/app/components/debug/commands/CreateIssuingCardAuthorization';
import CreateCheckoutSession from '@/app/components/debug/commands/CreateCheckoutSession';

const stripeCommands = [
  CreateReceivedCredit,
  CreateIssuingCardAuthorization,
  CreateCheckoutSession,
];

const DebugMenu = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Stripe">
          {stripeCommands.map((command, id) => (
            <CommandItem
              key={id}
              onSelect={async () => {
                const error = await command.action();
                if (error) {
                  console.error(error);
                }
                setOpen(false);
              }}
              className="aria-selected:text-black aria-selected:opacity-100"
            >
              <command.icon className="mr-2 h-4 w-4" />
              <span>{command.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => {
              router.push('/');
              setOpen(false);
            }}
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              router.push('/payments');
              setOpen(false);
            }}
          >
            <WalletIcon className="mr-2 h-4 w-4" />
            <span>Payments</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              router.push('/payouts');
              setOpen(false);
            }}
          >
            <CoinsIcon className="mr-2 h-4 w-4" />
            <span>Payouts</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              router.push('/finances');
              setOpen(false);
            }}
          >
            <LandmarkIcon className="mr-2 h-4 w-4" />
            <span>Finances</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              router.push('/settings');
              setOpen(false);
            }}
          >
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default DebugMenu;
