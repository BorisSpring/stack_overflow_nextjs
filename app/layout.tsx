import React from 'react';
import './globals.css';
import '../styles/theme.css';
import '../styles/prismjs.css';

import { ClerkProvider } from '@clerk/nextjs';

// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/themeProvider';

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
    <html lang='en'>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              fotterActionLink: 'primary-text-gradient hover:text-primary-500',
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default layout;
