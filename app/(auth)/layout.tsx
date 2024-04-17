'use client';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Container from '@/app/components/Container';
import LocaleSelector from '@/app/components/LocaleSelector';
import BackgroundImage from '@/public/background.jpg';
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
        <div className="flex w-[900px]">
          <div className="fixed min-h-full max-w-sm space-y-4">
            <Image
              className="mb-4 inline-block"
              src={PoseRed}
              alt="Pose"
              width={150}
              height={23}
            />
            <h1 className="text-4xl font-bold">{header}</h1>
            <p className="text-xl text-subdued">{subheader}</p>
            <Link
              href="mailto:support@pose.dev"
              className="flex flex-row items-center gap-x-1"
            >
              <div className="font-bold text-secondary">Contact support</div>
              <ArrowRight color="#f26552" size={18} className="mt-[1px]" />
            </Link>
            <p className="w-34 absolute bottom-20 left-0 h-24">
              <LocaleSelector />
            </p>
          </div>
          <div className="ml-auto min-w-[30rem]">
            <Container className="no-scrollbar overflow-scroll rounded-[16px]">
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
        className="fixed z-[-1] h-full w-full min-w-[926px] overflow-hidden object-cover"
      />
    </div>
  );
}
