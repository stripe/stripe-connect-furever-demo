'use client';

import Image from 'next/image';
import Container from '@/app/components/Container';
import FureverLogo from '@/public/furever_logo.png';
import Stripe from '@/public/stripe-gray.svg';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-paw-pattern bg-[size:426px] py-[60px]">
      <div className="w-[450px] mx-auto flex flex-col gap-12">
        <div className="flex w-full justify-center">
          <Link href="/">
            <div className="flex items-center gap-4 text-3xl font-bold text-primary">
              <Image src={FureverLogo} alt="Furever Logo" width={56} height={56} />
              Furever
            </div>
          </Link>
        </div>
        <Container className="w-full no-scrollbar overflow-scroll rounded-xl px-5 py-5">
          {children}
        </Container>

        <div className="w-full flex flex-col gap-2 items-center">
          <a href="https://stripe.com" target="_blank">
            <Image src={Stripe} alt="stripe logo" height={24} />
          </a>
          <p className="text-sm text-subdued text-center">
            This site is a demo for{' '}
            <a
              className="border-b border-black/20"
              href="https://docs.stripe.com/connect/get-started-connect-embedded-components"
              target="_blank"
            >
              Stripe Connect embedded components
            </a>
            .
            <br />
            Furever is not a real product.
          </p>
        </div>
      </div>
    </div>
  );
}
