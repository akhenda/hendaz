'use client';

import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';

import { api } from '@hendaz/backend/convex/_generated/api';
import { Button } from '@hendaz/ds/ui-kit';

export default function Index() {
  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);

  return (
    <div className="bg-slate-600 h-screen w-full flex items-center justify-center flex-col">
      <h1 className="text-white text-6xl">Hello world</h1>
      <div className="flex gap-2 m-4">
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

      <div className="m-4 flex flex-col gap-2">
        {files?.map((file) => (
          <div key={file._id} className="bg-slate-300 p-2 rounded-md">
            {file.name}
          </div>
        ))}
      </div>

      <Button
        className="mt-4"
        onClick={() => {
          createFile({ name: 'Hello, World' });
        }}
      >
        Click Me
      </Button>
    </div>
  );
}
