'use client';

import Link from 'next/link';

type Props = {
  text: 'Główna' | 'Losowy' | 'Statystyczki';
  href: string;
  disabled?: boolean;
};

export const NavItem = ({ text, href, disabled }: Props) => {
  return (
    <Link
      aria-disabled={disabled}
      href={href}
      className='w-full py-3 px-5 bg-slate-600 border-r last:border-r-0 text-center'
    >
      {text}
    </Link>
  );
};
