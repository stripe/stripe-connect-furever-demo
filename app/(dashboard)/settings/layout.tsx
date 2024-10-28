'use client';

import {signOut} from 'next-auth/react';
import SubNav from '@/app/components/SubNav';
import {Button} from '@/components/ui/button';

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex flex-col justify-between md:flex-row">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold">Your account</h1>
        </div>
        <div className="mt-4 flex flex-row md:mt-0">
          <SubNav
            base="/settings"
            routes={[{path: '/settings', label: 'General'}]}
          />
          <div>
            <Button
              className="text-md ml-2 self-end p-2 hover:bg-white/80 hover:text-primary"
              variant="ghost"
              onClick={async () => {
                signOut({callbackUrl: '/'});
              }}
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
