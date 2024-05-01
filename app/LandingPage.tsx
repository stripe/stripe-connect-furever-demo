'use client';
import {Link} from '@/components/ui/link';
import BackgroundImage from '@/public/pattern-green.png';
import Dog from '@/public/landing-page.jpeg';
import FureverLogo from '@/public/furever_logo.png';
import Image from 'next/image';
import DogHug from '@/public/testimonial.jpeg';
import Stripe from '@/public/stripe.png';
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
    <div className="flex h-[193px] w-[306px] flex-col items-center gap-y-2 rounded-[12px] border bg-white p-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-[100px] bg-offset p-1">
        {icon}
      </div>
      <p className="pt-2 text-lg font-bold">{title}</p>
      <p className="text-center text-secondary">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex h-[620px] flex-col items-center">
          <div className="flex flex-row gap-x-3 py-4">
            <Image
              src={FureverLogo}
              alt="Furever logo"
              height={32}
              width={32}
            />
            <h2 className="text-2xl font-bold text-offset">Furever</h2>
          </div>
          <h1 className="w-[734px] pt-[93px] text-center text-5xl font-bold text-offset">
            Manage your pet grooming business with ease.
          </h1>
          <p className="w-[734px] pt-4 text-center text-2xl text-offset">
            Furever is the world's leading pet grooming platform: join our team
            of salons and expand your business
          </p>
          <div className="flex flex-row gap-x-4 pt-[47px]">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push('/login')}
            >
              <p className="text-lg">Log in</p>
            </Button>
            <Button size="lg" onClick={() => router.push('/signup')}>
              <div className="gap-x-[6px flex flex-row text-lg">
                <p>Get started</p>
                <ArrowRight />
              </div>
            </Button>
          </div>
          <div className="absolute z-[-1] h-[620px] w-full min-w-[926px] overflow-hidden bg-black object-cover opacity-50" />
          <Image
            src={Dog}
            alt="logo"
            placeholder="blur"
            quality={100}
            sizes="100vw"
            className="absolute top-[-340px] z-[-2] max-h-[960px] w-full min-w-[926px] overflow-hidden bg-left object-cover"
          />
        </div>
        <div className="relative flex h-[474px] w-full flex-col items-center">
          <div className="flex flex-col items-center py-20">
            <h3 className="text-lg font-bold text-accent">FEATURES</h3>
            <p className="text-center text-3xl font-bold">
              Everything you need to manage your pet business
            </p>
            <div className="flex flex-row gap-x-5 pt-10">
              <Card
                icon={<CalendarCheck color="#27ae60" />}
                title="Simple scheduling"
                description="Easily set up new and recurring jobs, organize your calendar, notify
        technicians, and manage job details."
              />
              <Card
                icon={<CreditCard color="#27ae60" />}
                title="Accept payments"
                description="Take credit card and bank payments, offer instant financing to customers, track payments, and get paid faster."
              />
              <Card
                icon={<ReceiptText color="#27ae60" />}
                title="Manage your finances"
                description="Issue credit cards and view transactions."
              />
            </div>
          </div>
          <Image
            src={BackgroundImage}
            alt="logo"
            placeholder="blur"
            quality={100}
            sizes="100vw"
            className="absolute top-0 z-[-2] max-h-[474px] w-full min-w-[926px] overflow-hidden bg-left object-cover"
          />
        </div>
        <div className="relative flex h-[480px] w-full flex-col items-center bg-success-border">
          <div className="flex flex-row items-center gap-x-20 py-20">
            <Image
              src={DogHug}
              alt="hug dog"
              placeholder="blur"
              quality={100}
              sizes="100vw"
              height={320}
              width={336}
              className="overflow-hidden bg-left object-cover"
            />
            <div className="flex w-[584px] flex-col gap-y-6">
              <p className="text-3xl font-bold">
                This is a quote from a satisfied customer. They talk about how
                great Furever is, and what it did for their business.
              </p>
              <div className="flex flex-row gap-x-4 self-end">
                <div className="h-8 w-8 rounded-[100px] bg-accent" />
                <p className="text-2xl font-bold text-accent">Customer name</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex h-[474px] w-full flex-col items-center">
          <div className="flex flex-row items-center py-20">
            <div className="flex w-[544px] flex-col gap-y-1.5">
              <h2 className="text-left text-4xl font-bold">
                Get started today.
              </h2>
              <p className="text-left text-3xl">
                Furever is the world's leading pet grooming platform: join our
                team of salons and expand your business
              </p>
            </div>
            <div className="h-[350px] min-w-[448px] rounded-[16px] bg-white p-6">
              <h2 className="pb-2 text-2xl font-semibold">Create account</h2>
              <SignupForm />
            </div>
          </div>
          <Image
            src={BackgroundImage}
            alt="logo"
            placeholder="blur"
            quality={100}
            sizes="100vw"
            className="absolute top-0 z-[-2] max-h-[474px] w-full min-w-[926px] overflow-hidden bg-left object-cover"
          />
        </div>
        <div className="bg-banner fixed bottom-0 flex w-full flex-row justify-between px-[140px] py-8">
          <Image src={Stripe} alt="stripe logo" />
          <p className="text-offset">
            FurEver is a demo for{' '}
            <Link
              className="text-offset underline"
              href="https://docs.stripe.com/connect"
            >
              Stripe Connect
            </Link>{' '}
            and{' '}
            <Link
              className="text-offset underline"
              href="https://docs.stripe.com/connect/get-started-connect-embedded-components"
            >
              Stripe Connect embedded components
            </Link>
            . It is not a real product.
          </p>
        </div>
      </div>
    </>
  );
}
