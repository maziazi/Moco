
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

// Menentukan sebuah schema untuk validasi input
const userSchema = z
  .object({
      email: z.string().min(1, 'Email is required').email('Invalid email'),
      password: z
          .string()
          .min(1, 'Password is required')
          .min(8, 'Password must have than 8 characters'),
      username: z.string().min(1, 'Username is required').max(100),
  })

export async function POST (req: Request) {
    // return (
    //     NextResponse.json({success: true})
    // );
    try {
        const body = await req.json ();
        const {email, username, password} = userSchema.parse(body);

        // Untuk mengecek email sudah ada atau belum
        const existingUserByEmail = await db.user.findUnique({
            where: {email:email}
        });
        if (existingUserByEmail){
            return NextResponse.json (
                {user: null, massage: "Pengguna dengan email ini sudah ada"},
                {status: 409}
            )
        }

        // Untuk mengecek username sudah ada atau belum
        const existingUserByUsername = await db.user.findUnique({
            where: {username:username}
        });
        if (existingUserByUsername){
            return NextResponse.json (
                {user: null, massage: "Pengguna dengan username ini sudah ada"},
                {status: 409}
            )
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username, 
                email, 
                password: hashedPassword
            }
        })

        const { password: newUserPassword, ...rest}=newUser;

        return NextResponse.json(
            {user: rest, massage:"Pengguna berhasil dibuat"},
            {status: 201}
        );

    } catch (error){
        return NextResponse.json(
            {massage:"Something went wrong!"},
            {status: 500}
        );
    }
}