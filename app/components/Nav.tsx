'use client';

import {signOut} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  Home as HomeIcon,
  Calendar as CalendarIcon,
  Wallet as WalletIcon,
  Coins as CoinsIcon,
  Landmark as LandmarkIcon,
  Users as UsersIcon,
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
    label: 'Classes',
    href: '/classes',
    icon: CalendarIcon,
    paths: [],
  },
  {
    label: 'Instructors',
    href: '/instructors',
    icon: UsersIcon,
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
    paths: ['/finances/cards', '/finances/loans'],
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed z-40 h-screen w-64 bg-primary p-3">
      <Image
        className="p-5"
        src={PoseRed}
        alt="Pose"
        width={150}
        height={23}
      />
      <nav>
        <ul className="flex-col items-start space-x-0">
          {navigationMenuItems.map((item) => (
            <li key={item.label} className="p-1">
              <Link href={item.href}>
                <Button
                  className={`w-full justify-start text-lg text-white hover:bg-white ${
                    pathname === item.href || item.paths.includes(pathname)
                      ? 'bg-white bg-opacity-15 hover:bg-opacity-15'
                      : 'bg-none hover:bg-opacity-10'
                  }`}
                >
                  <item.icon className="mr-2 h-5 w-5" color="white" />{' '}
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/settings">
              <Button
                className={`fixed bottom-5 justify-start text-lg text-white hover:bg-white ${
                  pathname.startsWith('/settings')
                    ? 'bg-white bg-opacity-15 hover:bg-opacity-15'
                    : 'bg-none hover:bg-opacity-10'
                }`}
              >
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage src="/avatar.png" alt="profile" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>{' '}
                My studio
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
