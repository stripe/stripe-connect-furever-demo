'use client';

import {signOut} from 'next-auth/react';
import SubNav from '@/app/components/SubNav';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold">Your account</h1>
        </div>
        <div className="flex flex-row mt-4 md:mt-0">
          <SubNav
            base="/settings"
            routes={[
              {path: '/settings', label: 'General'},
              {path: '/settings/documents', label: 'Documents'},
            ]}
          />
          <div>
            <Button
              className="text-md ml-2 self-end p-2 hover:bg-white/80 hover:text-primary"
              variant="ghost"
              onClick={() => signOut({callbackUrl: '/'})}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
