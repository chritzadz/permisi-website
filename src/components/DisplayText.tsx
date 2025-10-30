import { Bodoni_Moda } from "next/font/google";
import { cn } from "@/lib/utils";

const bodoniModa = Bodoni_Moda({
    subsets: ["latin"],
    weight: ["400", "700"],
});

interface DisplayTextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function DisplayText({
    children,
    className,
    ...props
}: DisplayTextProps) {
    return (
        <div
            className={cn(
                `${bodoniModa.className} text-4xl font-bold`,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
