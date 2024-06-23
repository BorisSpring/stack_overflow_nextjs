import React from 'react';
import './globals.css';
import '../styles/theme.css';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  // SignedIn,
  // UserButton,
} from '@clerk/nextjs';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default layout;
// const inter = Inter({ subsets: ['latin'] });
