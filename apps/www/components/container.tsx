import { cn } from "@/lib/utils"

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
                "mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}