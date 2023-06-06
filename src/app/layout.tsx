import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import 'next/navigation';
import { ClerkProvider } from '@clerk/nextjs';
import { NavItem } from './NavItem';
import './globals.css';

const font = Poppins({ subsets: ['latin-ext'], weight: ['100', '400', '700'] });

export const metadata = {
  title: 'Wirkus.pro',
  description: '',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={font.className}>
          <div className='max-w-2xl mx-auto bg-slate-900 min-h-screen flex flex-col items-center'>
            <h1 className='my-4 text-4xl text-center font-thin tracking-wider'>Tortorugo</h1>
            <header className='flex w-full items-center justify-evenly'>
              <NavItem text='Główna' href='/' />
              <NavItem text='Losowy' href='/random' />
              <NavItem text='Statystyczki' href='/stats' />
            </header>
            <main className='flex flex-col mt-12 items-center justify-center'>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
