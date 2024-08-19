'use client';

import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs';

import { Button } from '@hendaz/ds/ui-kit';

export default function Index() {
  return (
    <div className="bg-slate-600 h-screen w-full flex items-center justify-center flex-col">
      <h1 className="text-white text-6xl">Hello world</h1>
      <div className="flex gap-2 mt-4">
        <SignedIn>
          <SignOutButton>
            <Button variant="secondary">Sign Out</Button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}
