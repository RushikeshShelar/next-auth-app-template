"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    backButtonLabel,
    backButtonHref,
    headerLabel,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            {showSocial && (
                <CardHeader>
                    <Social />
                </CardHeader>
            )}
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}