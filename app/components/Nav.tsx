'use client';

import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  Home as HomeIcon,
  Wallet as WalletIcon,
  Coins as CoinsIcon,
  Landmark as LandmarkIcon,
  Dog as PetsIcon,
  Settings as SettingsIcon,
  Sparkles as SparklesIcon,
  Menu as MenuIcon
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import FureverLogo from '@/public/furever_logo.png';
import Stripe from 'stripe';
import React from 'react';

const navigationMenuItems = [
  {
    label: 'Home',
    href: '/home',
    icon: HomeIcon,
    paths: [],
  },
  {
    label: 'Pets',
    href: '/pets',
    icon: PetsIcon,
    paths: [],
  },
  {
    label: 'Payments',
    href: '/payments',
    icon: WalletIcon,
    paths: [],
  },
  {
    label: 'Payouts',
    href: '/payouts',
    icon: CoinsIcon,
    paths: [],
  },
  {
    label: 'Finances',
    href: '/finances',
    icon: LandmarkIcon,
    paths: ['/finances/cards'],
    shouldDisplayFilter: (stripeAccount: Stripe.Account) =>
      stripeAccount.controller?.stripe_dashboard?.type === 'none' &&
      stripeAccount.controller?.losses?.payments === 'application' &&
      stripeAccount.controller?.requirement_collection === 'application',
  },
  {
    label: 'Account',
    href: '/settings',
    icon: SettingsIcon,
    paths: ['/settings/documents'],
  },
];

const Nav = () => {
  const pathname = usePathname();
  const {data: session} = useSession();

  const stripeAccount = session?.user?.stripeAccount;

  const [showMobileNavItems, setShowMobileNavItems] = React.useState(false)

  return (
    <div className="fixed sm:flex w-full sm:w-52 lg:w-64 sm:fixed sm:h-screen flex-col border-b sm:border-r bg-white sm:p-1 lg:p-3 z-40">
      <div className="flex justify-between items-center sm:mb-4 p-3">
        <Link href="/home">
          <div className="flex items-center gap-3 text-xl font-bold text-primary">
            <Image src={FureverLogo} alt="Furever Logo" className="w-9 h-9 sm:w-10 sm:h-10" />
            Furever
          </div>
        </Link>
        <Button variant="ghost" className="sm:hidden" onClick={() => setShowMobileNavItems(!showMobileNavItems)}>
          <MenuIcon />
        </Button>
      </div>
      <nav className={`${showMobileNavItems ? "flex" : "hidden"} w-full flex-1 sm:flex shadow-xl sm:shadow-none p-2 sm:p-0 pb-3 transition`}>
        <ul className="flex-col w-full">
          {navigationMenuItems
            .filter(({shouldDisplayFilter}) => {
              // Not all pages require a filter.
              if (!shouldDisplayFilter || !stripeAccount) {
                return true;
              }

              return shouldDisplayFilter(stripeAccount);
            })
            .map((item) => (
              <li key={item.label} className="p-1">
                <Link href={item.href}>
                  <Button
                    className={`w-full justify-start text-lg text-primary hover:bg-accent-subdued ${
                      pathname === item.href || item.paths.includes(pathname)
                        ? 'bg-accent-subdued text-accent'
                        : 'bg-white'
                    }`}
                    onClick={() => setShowMobileNavItems(false)}
                    tabIndex={-1}
                  >
                    <item.icon
                      className="mr-2"
                      size={20}
                      color={`${
                        pathname === item.href || item.paths.includes(pathname)
                          ? 'var(--accent)'
                          : 'var(--primary)'
                      }`}
                    />{' '}
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
