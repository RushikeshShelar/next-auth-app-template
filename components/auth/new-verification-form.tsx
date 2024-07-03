"use client";

import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Header } from "@/components/auth/header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BackButton } from "@/components/auth/back-button";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { newVerification } from "@/actions/new-verification";


export const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing Token");
            return
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data?.success);
                setError(data?.error);
            })
            .catch(() => {
                setError("Something went Wrong!")
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <>
            <Card className="w-[400px] shadow-md">
                <CardHeader>
                    <Header label="Confirm Your Verification" icon={<CheckCircledIcon className="text-emerald-500" />} />
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    {!success && !error && <BeatLoader />}
                    <FormSuccess message={success} />
                    {!success && (
                        <FormError message={error} />
                    )}
                </CardContent>
                <CardFooter>
                    <BackButton
                        label="Back to login"
                        href="/auth/login"
                    />
                </CardFooter>
            </Card>
        </>
    )
}