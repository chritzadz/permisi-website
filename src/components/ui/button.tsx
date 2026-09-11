import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
    onClick?: () => void;
    text?: string;
    icon?: ReactNode;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "outline";
    children?: ReactNode;
    className?: string;
}

export function Button({ onClick, text, icon, size = "md", variant = "default", children, className = "" }: ButtonProps) {
    let paddingClass = "p-2";
    if (size === "sm") {
        paddingClass = "p-1 text-sm";
    } else if (size === "lg") {
        paddingClass = "p-3 text-lg";
    }

    return (
        <div
            onClick={onClick}
            className={cn(
                paddingClass,
                "font-bold rounded-sm w-fit flex flex-row gap-1 items-center justify-center my-5 cursor-pointer select-none transition-all duration-300",
                variant === "default"
                    ? "bg-normal-maroon hover:bg-dark-maroon text-normal-creme"
                    : "bg-transparent border border-normal-maroon text-normal-maroon hover:bg-normal-creme",
                className,
            )}
        >
            {children ? children : (
                <>
                    {icon}
                    <p className="text-center">{text}</p>
                </>
            )}
        </div>
    )
}

export default Button;
