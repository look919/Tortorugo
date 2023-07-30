import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { RandomPostLinkButton } from './RandomPostLinkButton';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { UserProfile } from './UserProfile';

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
          <div className='mx-auto flex min-h-screen max-w-2xl flex-col items-center bg-slate-900'>
            <h1 className='my-4 text-center text-4xl font-thin tracking-wider'>Tortorugo</h1>
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
            <main className='mt-12 flex h-full w-full flex-col items-center  justify-center md:px-8'>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
