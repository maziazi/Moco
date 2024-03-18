import React, { Children, FC, ReactNode } from 'react'
import { Button } from './ui/button'

interface GoogleSigninButtonProps {
    children: ReactNode;
}

const GoogleSigninButton: FC<GoogleSigninButtonProps> = ({children}) => {
    const loginWithGoogle = () => console.log('login with google');

  return (
    <Button onClick={loginWithGoogle} className='w-full'>
        {children}
    </Button>
  )
}

export default GoogleSigninButton
