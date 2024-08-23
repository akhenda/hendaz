import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@hendaz/ds/ui-kit/lib/ui/button';

function Header() {
  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto justify-between flex">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          <Image src="/logo.png" width="50" height="50" alt="file drive logo" />
          FileDrive
        </Link>

        <SignedIn>
          <Button variant="outline">
            <Link href="/dashboard/files">Your Files</Link>
          </Button>
        </SignedIn>

        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

export default Header;
