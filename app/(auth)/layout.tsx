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
    <div className="min-h-screen bg-paw-pattern bg-[size:426px] py-4 sm:py-16">
      <div className="mx-auto flex max-w-[450px] flex-col gap-6 p-3 sm:gap-12">
        <div className="flex w-full justify-center">
          <Link href="/">
            <div className="flex items-center gap-4 text-3xl font-bold text-primary">
              <Image
                src={FureverLogo}
                alt="Furever Logo"
                className="h-12 w-12 sm:h-16 sm:w-16"
              />
              Furever
            </div>
          </Link>
        </div>
        <Container className="no-scrollbar w-full overflow-scroll rounded-xl px-5 py-5">
          {children}
        </Container>

        <div className="flex w-full flex-col items-center gap-2">
          <a href="https://stripe.com" target="_blank">
            <Image src={Stripe} alt="stripe logo" height={24} />
          </a>
          <p className="text-center text-sm text-subdued">
            This site is a demo for{' '}
            <a
              className="border-b border-black/20"
              href="https://docs.stripe.com/connect/get-started-connect-embedded-components"
              target="_blank"
            >
              Stripe Connect embedded components
            </a>
            . Furever is not a real product.
          </p>
        </div>
      </div>
    </div>
  );
}
