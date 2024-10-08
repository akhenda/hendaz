'use client';

import { ReactNode } from 'react';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

import config from '@hendaz/constants/web';

const convex = new ConvexReactClient(config.env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({ children }: { readonly children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={config.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
