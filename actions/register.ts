"use server";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db"

import * as z from "zod";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFeilds = RegisterSchema.safeParse(values);

    if (!validatedFeilds.success) {
        return {
            error: "Invalid Feilds!"
        }
    }

    const { email, password, name } = validatedFeilds.data;

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return {
            error: "Email Already in Use!"
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    });

    // TODO: SEND OTP OR VERIFICATION TOKEN EMAIL

    return {
        success: "User Created!"
    }
};