import { cn } from "@/lib/utils"
import React from "react"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
}

export function Container({
    children,
    className = "",
    ...props
}: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-[1280px] px-6 md:px-8",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}