import { ReactNode } from "react";

interface ButtonProps {
    onClick: () => void;
    text?: string;
    icon?: ReactNode;
    size?: "sm" | "md" | "lg";
    children?: ReactNode;
    className?: string;
}

export default function Button({ onClick, text, icon, size="md", children, className="" }: ButtonProps) {
    let paddingClass = "p-2";
    if(size === "sm"){
        paddingClass = "p-1 text-sm";
    }else if(size === "lg"){
        paddingClass = "p-3 text-lg";
    }

    return (
        <div className={`${paddingClass} ${className} font-bold bg-normal-maroon hover:bg-dark-maroon transition-all duration-300 rounded-sm w-fit text-normal-creme flex flex-row gap-1 items-center justify-center my-5 cursor-pointer select-none`} onClick={onClick}>
            {children ? children : (
                <>
                    {icon}
                    <p className="text-center">{text}</p>
                </>
            )}
        </div>
    )
}
