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

import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dev Overflow',
  description:
    'a communit ydrivern platform for asking and answering programming questions!',
  icons: {
    icon: '/asssets/images/site-logo.svg',
  },
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--inter',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--spaceGrotesk',
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
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
