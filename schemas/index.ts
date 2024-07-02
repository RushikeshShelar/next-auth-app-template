import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string({
        message: "Please Enter a Valid Email"
    }).email({
        message: "Please Enter a Valid Email"
    }),
    password: z.string({
        message: "Password is Required"
    })
});

export const RegisterSchema = z.object({
    email: z.string({
        message: "Please Enter a Valid Email"
    }).email({
        message: "Please Enter a Valid Email"
    }),
    password: z.string().min(1,{
        message: "Password must inlcude 6 characters"
    }),
    name: z.string({
        message: "Name is Required."
    }).min(1, {
        message: "Name is Required."
    })
});

