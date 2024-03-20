import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user){
        return <h2 className='text-2xl'>Halaman Admin - Selamat datang kembali {session?.user.username}</h2>
    }
    return <h2 className='text-2xl'>Tolong login untuk melihat halaman admin</h2>
}

export default page
