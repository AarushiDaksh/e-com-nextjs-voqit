'use client';

import Image from 'next/image';
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import MaxWidthWrapper from './MaxWidthWrapper';
import NavMobileDropdown from './NavMobileDropdown';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className='sticky z-[100] h-20 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='h-20 flex items-center justify-between max-sm:mx-10 border-solid border-slate-100'>
          <Link href='/'>
            <Image
              src='/nxt-trendz-logo-img.png'
              alt='Home Logo'
              width={250}
              height={150}
              className='object-contain'
              priority
            />
          </Link>

          <div className='flex gap-7 text-gray-700 items-center max-sm:hidden'>
            <Link href='/'>Home</Link>
            <Link href='/product'>Product</Link>
            <div className='relative'>
              {cart.length > 0 && (
                <span className='absolute -top-2 -right-5 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                  {cart.length}
                </span>
              )}
              <Link href='/cart'>Cart</Link>
            </div>
            <div className='p-1 bg-slate-200 rounded-full'>
              <UserButton />
            </div>
          </div>

          <div className='sm:hidden'>
            <NavMobileDropdown />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
