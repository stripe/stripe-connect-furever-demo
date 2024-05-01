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
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import FureverLogo from '@/public/furever_logo.png';

const navigationMenuItems = [
  {
    label: 'Home',
    href: '/',
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
  },
  {
    label: 'Account',
    href: '/settings',
    icon: SettingsIcon,
    paths: [],
  },
];

const Nav = () => {
  const pathname = usePathname();
  const {data: session} = useSession();

  const accountID = session?.user?.stripeAccount?.id;

  return (
    <div className="fixed z-40 flex h-screen w-64 flex-col border-r bg-white p-3">
      <div className="mb-4 flex items-center gap-3 p-3 text-xl font-bold text-primary">
        <Image src={FureverLogo} alt="Furever Logo" width={40} height={40} />
        Furever
      </div>
      <nav className="flex-1">
        <ul className="flex-col items-start space-x-0">
          {navigationMenuItems.map((item) => (
            <li key={item.label} className="p-1">
              <Link href={item.href}>
                <Button
                  className={`w-full justify-start text-lg text-primary hover:bg-accent-subdued ${
                    pathname === item.href || item.paths.includes(pathname)
                      ? 'bg-accent-subdued text-accent'
                      : 'bg-white'
                  }`}
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
      <div className="w-full rounded-lg border-2 border-black/5 bg-gradient-to-tr from-[#E4E5F9] to-[#DAEFF7] p-3">
        <div className="flex items-center gap-2 font-bold">
          <SparklesIcon size={20} color="var(--primary)" />
          <p className="text-primary">Tools</p>
        </div>
        <p className="mb-4 text-[15px]">
          Explore embedded components and blah blah.
        </p>
        <Button
          size="sm"
          className="w-full bg-gradient-to-r from-[#7F81FA] to-[#49B8EF] shadow"
        >
          Open tools
        </Button>
      </div>
    </div>
  );
};

export default Nav;
