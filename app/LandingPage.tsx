'use client';
import {Link} from '@/components/ui/link';
import Dog from '@/public/landing-page.jpeg';
import FureverLogo from '@/public/furever_logo.png';
import Image from 'next/image';
import DogHug from '@/public/testimonial.jpeg';
import Stripe from '@/public/stripe.svg';
import {Button} from '@/components/ui/button';
import {ArrowRight, CalendarCheck, CreditCard, ReceiptText} from 'lucide-react';
import {useRouter} from 'next/navigation';
import SignupForm from './(auth)/signup/form';

function Card({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col flex-1 items-center rounded-lg border bg-white p-6 hover:scale-[1.02] hover:shadow-md transition duration-150">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-subdued">
        {icon}
      </div>
      <p className="pt-4 text-lg font-bold text-primary">{title}</p>
      <p className="text-center text-subdued">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-w-[1024px]">
      <div className="relative">
        <div className="max-w-screen-lg mx-auto px-4 flex flex-col items-center pb-[140px]">
          <div className="flex flex-row w-full justify-between items-center py-4">
            <div className="flex gap-x-3 items-center">
              <Image
                src={FureverLogo}
                alt="Furever logo"
                height={48}
                width={48}
              />
              <p className="text-2xl text-white font-bold">Furever</p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push('/login')}
              role="link"
            >
              Log in
            </Button>
          </div>

          <div className="py-16 max-w-[700px]">
            <h1 className="text-center text-6xl font-bold text-white mb-1 leading-tight drop-shadow">
              Manage your pet business with ease.
            </h1>
            <p className="pt-4 text-center text-[24px] text-white drop-shadow">
              Furever is the world's leading pet grooming platform. Join our team
              of salons and expand your business.
            </p>
          </div>
          <div className="flex flex-row gap-x-4">
            <Button
              variant="secondary"
              size="lg"
              className=""
              onClick={() => router.push('/login')}
              role="link"
            >
              Log in
            </Button>
            <Button
              size="lg"
              onClick={() => router.push('/signup')}
              className="gap-x-1 items-center flex"
              role="link"
            >
                Get started
                <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="absolute z-[-1] h-full w-full top-0 overflow-hidden bg-gradient-to-t from-black/70 to-black/40" />
        <Image
          src={Dog}
          alt="logo"
          placeholder="blur"
          quality={100}
          sizes="100vw"
          className="absolute z-[-2] h-full w-full top-0 overflow-hidden object-cover"
        />
      </div>

      {/* Features section */}
      <div className="relative bg-paw-pattern bg-[size:426px]">
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="flex flex-col items-center py-20">
            <h3 className="text-lg font-bold text-accent">FEATURES</h3>
            <p className="text-center text-3xl font-bold mb-12">
              Everything you need to manage your pet business
            </p>
            <div className="flex flex-row gap-x-6">
              <Card
                icon={<CalendarCheck color="var(--accent)" />}
                title="Simple scheduling"
                description="Easily set up new and recurring jobs, organize your calendar, notify
        technicians, and manage job details."
              />
              <Card
                icon={<CreditCard color="var(--accent)" />}
                title="Accept payments"
                description="Take credit card and bank payments, offer instant financing to customers, track payments, and get paid faster."
              />
              <Card
                icon={<ReceiptText color="var(--accent)" />}
                title="Manage your finances"
                description="Issue credit cards and view transactions."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quote section */}
      <div className="relative bg-accent-subdued">
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="flex flex-row items-center gap-x-20 py-20">
            <Image
              src={DogHug}
              alt="hug dog"
              placeholder="blur"
              quality={100}
              sizes="100vw"
              className="overflow-hidden rounded-xl border shadow-lg object-cover"
            />
            <div className="flex flex-col gap-y-6">
              <p className="text-3xl font-bold">
                This is a quote from a satisfied customer. They talk about how
                great Furever is, and what it did for their business.
              </p>
              <div className="flex flex-row gap-x-3 items-center self-end">
                <div className="h-5 w-5 rounded-full bg-accent" />
                <p className="text-xl font-medium text-accent">Customer name</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Get started section */}
      <div className="relative items-center bg-accent bg-paw-pattern-white bg-[size:426px]">
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="flex items-center gap-20 py-20">
            <div className="flex-1 text-offset drop-shadow-sm">
              <h2 className="text-left text-4xl mb-2 font-bold">
                Get started today.
              </h2>
              <p className="text-left text-2xl">
                Furever is the world's leading pet grooming platform. Join our
                team of salons and expand your business
              </p>
            </div>
            <div className="min-w-[400px] rounded-xl bg-white p-6 shadow-lg">
              <h2 className="pb-2 text-2xl font-semibold">Create account</h2>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-banner py-6">
        <div className="max-w-screen-lg px-4 mx-auto flex justify-between items-center">
          <a href="https://stripe.com">
            <Image src={Stripe} alt="stripe logo" />
          </a>
          <p className="text-white text-sm opacity-90">
            FurEver is a demo for{' '}
            <Link
              className="text-white border-b"
              href="https://stripe.com/connect"
            >
              Stripe Connect
            </Link>{' '}
            and{' '}
            <Link
              className="text-white border-b"
              href="https://docs.stripe.com/connect/get-started-connect-embedded-components"
            >
              Stripe Connect embedded components
            </Link>
            . It is not a real product.
          </p>
        </div>
      </div>
    </div>
  );
}
