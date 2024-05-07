'use client';
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
    <div className="flex flex-1 flex-col items-center rounded-lg border bg-white p-6 transition duration-150 hover:scale-[1.02] hover:shadow-md">
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
        <div className="mx-auto flex max-w-screen-lg flex-col items-center px-4 pb-[140px]">
          <div className="flex w-full flex-row items-center justify-between py-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={FureverLogo}
                alt="Furever logo"
                height={48}
                width={48}
              />
              <p className="text-2xl font-bold text-white">Furever</p>
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

          <div className="max-w-[700px] py-16">
            <h1 className="mb-1 text-center text-6xl font-bold leading-tight text-white drop-shadow">
              Manage your pet business with ease.
            </h1>
            <p className="pt-4 text-center text-[24px] text-white drop-shadow">
              Furever is the world's leading pet grooming platform. Join our
              team of salons and expand your business.
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
              className="flex items-center gap-x-1"
              role="link"
            >
              Get started
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="absolute top-0 z-[-1] h-full w-full overflow-hidden bg-gradient-to-t from-black/70 to-black/40" />
        <Image
          src={Dog}
          alt="logo"
          placeholder="blur"
          quality={100}
          sizes="100vw"
          className="absolute top-0 z-[-2] h-full w-full overflow-hidden object-cover"
        />
      </div>

      {/* Features section */}
      <div className="relative bg-paw-pattern bg-[size:426px]">
        <div className="mx-auto max-w-screen-lg px-4">
          <div className="flex flex-col items-center py-20">
            <h3 className="text-lg font-bold text-accent">FEATURES</h3>
            <p className="mb-12 text-center text-3xl font-bold">
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
        <div className="mx-auto max-w-screen-lg px-4">
          <div className="flex flex-row items-center gap-x-20 py-20">
            <Image
              src={DogHug}
              alt="hug dog"
              placeholder="blur"
              quality={100}
              sizes="100vw"
              className="overflow-hidden rounded-xl border object-cover shadow-lg"
            />
            <div className="flex flex-col gap-y-6">
              <p className="text-3xl font-bold">
                This is a quote from a satisfied customer. They talk about how
                great Furever is, and what it did for their business.
              </p>
              <div className="flex flex-row items-center gap-x-3 self-end">
                <div className="h-5 w-5 rounded-full bg-accent" />
                <p className="text-xl font-medium text-accent">Customer name</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Get started section */}
      <div className="relative items-center bg-accent bg-paw-pattern-white bg-[size:426px]">
        <div className="mx-auto max-w-screen-lg px-4">
          <div className="flex items-center gap-20 pb-32 pt-20">
            <div className="flex-1 text-offset drop-shadow-sm">
              <h2 className="mb-2 text-left text-4xl font-bold">
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
      <div className="fixed bottom-5 right-[50%] flex w-[1000px] translate-x-2/4 flex-row rounded-lg bg-gradient-to-tr from-[#9160F1] to-[#11DFD4] px-6 py-3 shadow-xl">
        <div className="flex flex-1 items-center gap-6">
          <a href="https://stripe.com" target="_blank">
            <Image
              src={Stripe}
              alt="stripe logo"
              height={20}
              color="var(--accent)"
            />
          </a>
          <p className="text-sm text-white">
            This site is a demo for{' '}
            <a
              className="border-b border-white/60 text-white transition hover:border-white/90"
              href="https://docs.stripe.com/connect/get-started-connect-embedded-components"
              target="_blank"
            >
              Stripe Connect embedded components
            </a>
            . Furever is not a real product.
          </p>
        </div>
        <a
          className="flex items-center gap-1 font-medium text-white transition hover:opacity-80"
          href="https://github.com/stripe/stripe-connect-furever-demo"
          target="_blank"
        >
          View on Github
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}