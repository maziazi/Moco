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
import { useRouter } from 'next/navigation';
import { toast, useToast } from '../ui/use-toast';

const FormSchema = z
  .object({
      email: z.string().min(1, 'Email is required').email('Invalid email'),
      password: z
          .string()
          .min(1, 'Password is required')
          .min(8, 'Password must have than 8 characters'),
      username: z.string().min(1, 'Username is required').max(100),
      confirmPassword: z
      .string()
      .min(1, 'Password confirmation is required'),
  })
  .refine((data)=>data.password===data.confirmPassword,{
    path: ['confirmPassword'],
    message: 'Password tidak cocok',
  });

const SignUpForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        username:'',
        email:'',
        password:'',
        confirmPassword:''
      }
    })

    const onSubmit = async (values:z.infer<typeof FormSchema>) => {
      const response = await fetch('api/user', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password
        })
      })

      if (response.ok){
        router.push('./sign-in')
      } else {
        toast({
            title: "Error",
            description: "Oops! Something when wrong",
            variant: 'destructive'
        })

      }
    }

    return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className='space-y-2'>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Buat username" type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} 
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Ulangi passwordmu" type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} 
                />
                </div>
                <Button className='w-full mt-6' type="submit">
                    Sign up
                </Button>
                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-200 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-200'>
                    or
                </div>
                <GoogleSigninButton>Sign up with Google</GoogleSigninButton>
                <p className='text-clip text-sm text-gray-500 mt-4'>
                    If you don&apos;t have an account, please &nbsp;
                    <Link href='./sign-in' className='text-blue-500 hover:underline'>Sign in</Link>
                </p>
            </form>
        </Form>
    </>
  )
}

export default SignUpForm;
