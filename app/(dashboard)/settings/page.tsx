'use client';

import * as React from 'react';
import {
  ConnectPaymentMethodSettings,
  ConnectAccountManagement,
  ConnectNotificationBanner,
} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import NotificationBannerContainer from '@/app/components/NotificationBannerContainer';
import {useSession} from 'next-auth/react';
import EditAccountButton from '@/app/components/EditAccountButton';
import {Link} from '@/components/ui/link';
import {Button} from '@/components/ui/button';
import {LoaderCircle, Plus} from 'lucide-react';

export default function Settings() {
  const {data: session} = useSession();
  const enableBorder = false;
  const [showPassword, setShowPassword] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const email = session?.user.email;
  const businessName = session?.user.businessName;
  const password = session?.user.password;

  const onClick = async () => {
    setButtonLoading(true);
    try {
      const res = await fetch('/api/setup_accounts/create_risk_intervention', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setButtonLoading(false);
        window.location.reload();
      }
    } catch (e) {
      console.log('Error with creating test intervention: ', e);
    }
  };

  return (
    <>
      <NotificationBannerContainer>
        <EmbeddedComponentContainer>
          <ConnectNotificationBanner />
        </EmbeddedComponentContainer>
      </NotificationBannerContainer>
      <Container>
        <div className="flex flex-row justify-between">
          <h1 className="mb-4 text-xl font-semibold">Details</h1>
          <div className="text-right align-top text-sm font-semibold text-accent">
            <EditAccountButton />
          </div>
        </div>
        <div className="flex flex-row space-x-20">
          <div>
            <div className="text-subdued">Business name</div>
            <div className="font-medium">{businessName}</div>
          </div>
          <div>
            <div className="text-subdued">Email</div>
            <div className="font-medium">{email}</div>
          </div>
          <div>
            <div className="text-subdued">Password</div>
            <div className="font-medium">
              {showPassword ? password : '*********'}
            </div>
            <Link
              className="text-sm font-semibold text-accent"
              href="#"
              onClick={() => setShowPassword(!showPassword)}
            >
              {' '}
              {showPassword ? 'Hide password' : 'Show password'}
            </Link>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-row justify-between">
          <header className="mb-5">
            <h1 className="text-xl font-semibold">Account settings</h1>
            <h2 className="text-subdued">
              Manage account and business settings.
            </h2>
          </header>
          <Button className="h-10" onClick={onClick} disabled={buttonLoading}>
            {buttonLoading ? (
              <>
                <LoaderCircle className="mr-1 animate-spin" size={20} />{' '}
                Creating intervention
              </>
            ) : (
              <>
                <Plus size={20} className="mr-1" /> Create test risk
                intervention
              </>
            )}
          </Button>
        </div>
        <EmbeddedComponentContainer>
          <ConnectAccountManagement />
        </EmbeddedComponentContainer>
      </Container>

      <Container>
        <header className="mb-5">
          <h1 className="text-xl font-semibold">Payment methods</h1>
          <h2 className="text-subdued">Add and manage your payment methods.</h2>
        </header>
        <EmbeddedComponentContainer>
          <ConnectPaymentMethodSettings />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
