'use client';

import * as React from 'react';
import Container from '@/app/components/Container';
import {useSession} from 'next-auth/react';
import EditAccountButton from '@/app/components/EditAccountButton';
import {Link} from '@/components/ui/link';

export default function Settings() {
  const {data: session} = useSession();
  const [showPassword, setShowPassword] = React.useState(false);
  const email = session?.user.email;
  const businessName = session?.user.businessName;
  const password = session?.user.password;

  const canShowPassword = !session?.user.changedPassword;

  return (
    <>
      <p>TODO: banner is here</p>

      <Container className="pl-5">
        <div className="flex flex-row justify-between">
          <h1 className="mb-4 text-xl font-semibold">Details</h1>
          <div className="text-right align-top text-sm font-semibold text-accent">
            <EditAccountButton />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-20">
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
              {showPassword && canShowPassword ? password : '••••••••'}
            </div>
            {canShowPassword && (
              <Link
                className="text-sm font-semibold text-accent"
                href="#"
                onClick={() => setShowPassword(!showPassword)}
              >
                {' '}
                {showPassword ? 'Hide password' : 'Show password'}
              </Link>
            )}
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start justify-between sm:flex-row">
            <header className="mb-5 ml-2">
              <h1 className="text-xl font-semibold">Account settings</h1>
              <h2 className="text-subdued">
                Manage account and business settings.
              </h2>
            </header>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <p>TODO: account management goes here</p>
        </div>
      </Container>

      <Container>
        <header className="mb-5 ml-2">
          <h1 className="text-xl font-semibold">Payment methods</h1>
          <h2 className="text-subdued">Add and manage your payment methods.</h2>
        </header>
        <p>TODO: payment methods go here</p>
        <p>TODO: simple payments list implementation...</p>
      </Container>
    </>
  );
}
