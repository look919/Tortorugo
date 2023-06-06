import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Wirkus.pro',
  description: '',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="max-w-2xl mx-auto bg-slate-900 flex min-h-screen flex-col items-center">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
