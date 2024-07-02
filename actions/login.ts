"use server";

import { AuthError } from "next-auth";
import * as z from "zod";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFeilds = LoginSchema.safeParse(values);

    if (!validatedFeilds.success) {
        return {
            error: "Invalid Feilds!"
        }
    }

    const { email, password } = validatedFeilds.data;

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