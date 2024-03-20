import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { BookOpenText } from 'lucide-react'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import UserAccountNav from './userAccountNav'

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='bg-slate-400 py-2 border-2 border-s-sky-300 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link className='flex items-start' href='/'><BookOpenText /> MOCO</Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link className={buttonVariants()} href='/sign-in'>Sign In</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
