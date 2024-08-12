'use client';

import { ReactNode } from 'react';
import config from '@hendaz/constants';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(config.web.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
