"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFeilds = RegisterSchema.safeParse(values);

    if (!validatedFeilds.success) {
        return {
            error: "Invalid Feilds!"
        }
    }

    const { email, password, name } = validatedFeilds.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {
            error: "Email Already in Use!"
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    return {
        success: "Confirmation email sent!"
    }
};