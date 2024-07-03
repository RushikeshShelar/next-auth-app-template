
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

import bcryptjs from "bcryptjs"

import type { NextAuthConfig } from "next-auth"

import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
 
export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CILENT_SECRET
        }),
        Credentials({
            async authorize(credentials){
                const validatedFeilds = LoginSchema.safeParse(credentials);

                if(validatedFeilds.success){
                    const { email, password } = validatedFeilds.data;
                    
                    const user = await getUserByEmail(email);
                    if(!user || !user.password) return null;

                    const passwordsMatch = await bcryptjs.compare(
                        password,
                        user.password,
                    );

                    if(passwordsMatch) return user;
                }

                return null;
            }
        })
    ]
} satisfies NextAuthConfig