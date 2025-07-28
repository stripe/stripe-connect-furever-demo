'use client';

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useGetStripeAccount} from '@/app/hooks/useGetStripeAccount';
import {LoaderCircle} from 'lucide-react';

const LoadingView = () => {
  return (
    <div className="h-64 content-center">
      <LoaderCircle className="mx-auto animate-spin" size={30} />
    </div>
  );
};

export default function AuthenticatedAndOnboardedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const {data: session, status} = useSession();
  const {stripeAccount, loading} = useGetStripeAccount();

  const isLoading = !session || !session.user || loading;

  if (isLoading) {
    return <LoadingView />;
  }

  useEffect(() => {
    if (stripeAccount?.details_submitted === false) {
      router.push('/onboarding');
    }
  }, [stripeAccount, loading, router]);

  return <>{children}</>;
}
