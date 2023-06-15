import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { ClerkProvider } from '@clerk/nextjs';
import { RandomPostLinkButton } from './RandomPostLinkButton';
import { UserProfile } from './UserProfile';
import './globals.css';

const font = Poppins({ subsets: ['latin-ext'], weight: ['100', '400', '700'] });

export const metadata = {
  title: 'Tortorugo',
  description: 'Przemyślenia pewnego turtla',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const navItemClassName = 'w-full py-3 px-5 bg-slate-600 border-r last:border-r-0 text-center';

  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={font.className}>
          <div className='max-w-2xl mx-auto bg-slate-900 min-h-screen flex flex-col items-center'>
            <h1 className='my-4 text-4xl text-center font-thin tracking-wider'>Tortorugo</h1>
            <div className='m-4 mt-0'>
              <UserProfile />
            </div>
            <header className='flex w-full items-center justify-evenly'>
              <Link href='/' className={navItemClassName}>
                Główna
              </Link>
              <RandomPostLinkButton className={navItemClassName} />
              <Link href='/stats' className={navItemClassName}>
                Statystyczki
              </Link>
            </header>
            <main className='flex flex-col mt-12 h-full w-full px-8 items-center justify-center'>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
