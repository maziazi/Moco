'use client';

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { redirect } from "next/dist/server/api-utils";

const userAccountNav = () => {
  return (
    <Button onClick={()=> signOut({
        redirect: true,
        callbackUrl:`${window.location.origin}/sign-in`
    }
    )} variant='destructive'>Sign out</Button>
  );
}

export default userAccountNav
