'use client';
import { useForm } from 'react-hook-form';
// import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Link from 'next/link';
import GoogleSigninButton from '../GoogleSigninButton';
import { sign } from 'crypto';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
})

const SignInForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email:'',
        password:'',
      }
    })

    const onSubmit = async (values:z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            emil: values.email,
            password: values.password,
        });
        console.log(signInData);

        if (signInData?.error){
            console.log(signInData.error);
        } else {
            router.push('../admin');
        }
    };

    return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className='space-y-2'>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan akun email" type='email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} 
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan passwordmu" type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} 
                />
                </div>
                <Button className='w-full mt-6' type="submit">
                    Sign in
                </Button>
                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-200 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-200'>
                    or
                </div>
                <GoogleSigninButton>Sign in with Google</GoogleSigninButton>
                <p className='text-clip text-sm text-gray-500 mt-4'>
                    If you don&apos;t have an account, please &nbsp;
                    <Link href='./sign-up' className='text-blue-500 hover:underline'>Sign up</Link>
                </p>
            </form>
        </Form>
    </>
  )
}

export default SignInForm;
