'use client';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Container from '@/app/components/Container';
import LocaleSelector from '@/app/components/LocaleSelector';
import BackgroundImage from '@/public/pattern-green.png';
import {ArrowRight} from 'lucide-react';
import PoseRed from '@/public/pose_red.svg';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  let header = 'Manage your studio with ease.';
  let subheader = `Pose is the world's leading health and wellness platform.`;

  if (pathname === '/onboarding') {
    header = 'Sign up';
    subheader = 'Fill out the form to set up your account.';
  }

  return (
    <div className="relative">
      <div className="flex min-h-screen min-w-[926px] justify-center space-x-20 px-6 py-[120px]">
        <div className="flex w-[448px]">
          <div className="min-w-[30rem]">
            <Container className="no-scrollbar overflow-scroll rounded-[16px] px-5 py-5">
              {children}
            </Container>
          </div>
        </div>
      </div>
      <Image
        src={BackgroundImage}
        alt="logo"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="z-[-1] h-full w-full min-w-[926px] overflow-hidden bg-left object-cover"
      />
    </div>
  );
}
