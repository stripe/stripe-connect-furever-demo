'use client';

import {signOut} from 'next-auth/react';
import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';
import SubNav from '@/app/components/SubNav';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticatedAndOnboardedRoute>
      <header className="flex flex-row justify-between">
        <div className="flex flex-row">
          <Avatar className="w-10 h-10 mr-5">
            <AvatarImage src="/avatar.png" alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>{' '}
          <h1 className="text-3xl font-bold">My studio</h1>
        </div>
        <div className="flex flex-row justify-between">
          <SubNav
            base="/settings"
            routes={[
              {path: '/settings', label: 'Settings'},
              {path: '/settings/paymentmethods', label: 'Payment methods'},
            ]}
          />
          <div>
            <Button
              className="self-end font-bold text-md"
              variant="ghost"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>
      {children}
    </AuthenticatedAndOnboardedRoute>
  );
}
