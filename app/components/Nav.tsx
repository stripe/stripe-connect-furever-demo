'use client';

import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  Home as HomeIcon,
  Calendar as CalendarIcon,
  Wallet as WalletIcon,
  Coins as CoinsIcon,
  Landmark as LandmarkIcon,
  Dog as PetsIcon,
  Settings as SettingsIcon,
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import PoseRed from '@/public/pose_red.svg';

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
    label: 'Settings',
    href: '/settings',
    icon: SettingsIcon,
    paths: [],
  }
];

const Nav = () => {
  const pathname = usePathname();
  const {data: session} = useSession();

  const accountID = session?.user?.stripeAccount?.id;

  return (
    <div className="fixed z-40 h-screen w-64 bg-white border-r p-3">
      {/* <Image className="p-5" src={PoseRed} alt="Pose" width={150} height={23} /> */}
      <nav>
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
                  <item.icon className="mr-2" size={20} color={`${
                    pathname === item.href || item.paths.includes(pathname)
                      ? 'var(--accent)'
                      : 'var(--primary)'
                  }`} />{' '}
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
