import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { BookOpenText } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='bg-slate-400 py-2 border-2 border-s-sky-300 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link className='flex items-start' href='/'><BookOpenText /> MOCO</Link>
        <Link className={buttonVariants()} href='/sign-in'>Sign In</Link>
      </div>
    </div>
  )
}

export default Navbar
