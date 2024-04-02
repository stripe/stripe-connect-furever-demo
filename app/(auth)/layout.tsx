'use client';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Container from '@/app/components/Container';
import BackgroundImage from '@/public/background.jpg';
import {ChevronRight} from 'lucide-react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  let header = 'Manage your studio with ease.';
  let subheader = `Pose is the world's leading health and wellness platform.`;

  if (pathname !== '/login') {
    header = 'Sign up';
    subheader = 'Fill out the form to set up your account.';
  }

  return (
    <>
      <div className="flex min-h-screen min-w-[926px] justify-center space-x-20 px-6 py-[120px]">
        <div className="flex w-[850px]">
          <div className="fixed max-w-sm space-y-4">
            <Image
              className="mb-4 inline-block"
              src="pose_red.svg"
              alt="Pose"
              width={150}
              height={23}
            />
            <h1 className="text-4xl font-bold">{header}</h1>
            <p className="text-xl">{subheader}</p>
            <Link
              href="mailto:support@example.com"
              className="flex flex-row items-center"
            >
              <div className="font-bold text-secondary">Contact support</div>
              <ChevronRight color="#f26552" size={18} className="mt-[1px]" />
            </Link>
          </div>
          <div className="ml-auto min-w-96">
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
    </>
  );
}
