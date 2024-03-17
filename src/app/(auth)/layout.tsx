import React, { FC, ReactNode } from 'react'
interface AuthLayoutProps {
    children:ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='bg-slate-400 p-10'>
      {children}
    </div>
  )
}

export default AuthLayout
