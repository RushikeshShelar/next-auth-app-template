import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";

import {
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Something Went Wrong!!" icon={<ExclamationTriangleIcon className="text-destructive" />} />
            </CardHeader>

            <CardFooter>
                <BackButton
                    label="Back to login"
                    href="/auth/login"
                />
            </CardFooter>
        </Card>
    )
}