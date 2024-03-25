import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  Home as HomeIcon,
  Calendar as CalendarIcon,
  Wallet as WalletIcon,
  Coins as CoinsIcon,
  Landmark as LandmarkIcon,
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

const navigationMenuItems = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    label: 'Classes',
    href: '/dashboard/classes',
    icon: CalendarIcon,
  },
  {
    label: 'Payments',
    href: '/dashboard/payments',
    icon: WalletIcon,
  },
  {
    label: 'Payouts',
    href: '/dashboard/payouts',
    icon: CoinsIcon,
  },
  {
    label: 'Finance',
    href: '/dashboard/finance',
    icon: LandmarkIcon,
  },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="p-3 bg-primary fixed w-64 h-screen">
      <Image
        className="p-5"
        src="pose.svg"
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
                    pathname === item.href
                      ? 'bg-white hover:bg-opacity-25 bg-opacity-25'
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
                  pathname === '/settings'
                    ? 'bg-white hover:bg-opacity-25 bg-opacity-25'
                    : 'bg-none hover:bg-opacity-10'
                }`}
              >
                <Avatar className="w-5 h-5 mr-2">
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

export default Navigation;
