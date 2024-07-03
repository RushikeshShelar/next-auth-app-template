"use server";

import { AuthError } from "next-auth";
import * as z from "zod";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFeilds = LoginSchema.safeParse(values);

    if (!validatedFeilds.success) {
        return {
            error: "Invalid Feilds!"
        }
    }

    const { email, password } = validatedFeilds.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return {
            error: "Email does not exist!"
        }
    }


    if(!existingUser.emailVerified){
        const validCredentials = await bcrypt.compare(
            password,
            existingUser.password
        );

        if(!validCredentials) {
            return {
                error: "Invalid Credentials"
            }
        }
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return {
            success: "Please Verify your Email First. Verication email has been sent."
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });

    } catch (error) {
        //TODO
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid Credentials!"
                    };
                default:
                    return {
                        error: "Something went wrong!"
                    };
            }
        }
        throw error;
    }
};