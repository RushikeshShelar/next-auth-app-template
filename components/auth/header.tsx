import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const font = Poppins({
    subsets: ["latin"],
    weight: ['600'],
});

interface HeaderProps {
    label?: string;
    icon?: React.ReactNode;
}

export const Header = ({
    label,
    icon
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
                "text-3xl",
                font.className
            )}>
                🔐 Auth
            </h1>
            <p className="text-muted-foreground text-sm flex gap-x-2 items-center">
                 {icon} {label}
            </p>
        </div>
    )
}