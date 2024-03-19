import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import Email from "next-auth/providers/email";
import { compare } from "bcrypt";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn: "./sign-in",
    },
    // Configure one or more authentication providers
    // providers: [
    //   GithubProvider({
    //     clientId: process.env.GITHUB_ID,
    //     clientSecret: process.env.GITHUB_SECRET,
    //   }),
    //   // ...add more providers here
    // ],
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "maziazi@azi.com" },
            password: { label: "Password", type: "password" }
          },
          
            async authorize(credentials) {
            // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      
                if ( !credentials?.email || !credentials?.password){
                    return null;
                }
                
                const existingUser = await db.user.findUnique({
                    where: {email: credentials?.email}
                });
                if (!existingUser){
                    return null;
                } 

                const passwordMatch = await compare(credentials.password, existingUser.password);

                if(!passwordMatch){
                    return null;
                }

                return{
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email
                }
            }
        })
      ]
  }