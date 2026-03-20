import { cn } from "@/lib/utils"

interface AltruvexLogoProps {
    className?: string
    size?: "sm" | "md" | "lg"
    variant?: "full" | "icon"
}

export function AltruvexLogo({ className, size = "md", variant = "full" }: AltruvexLogoProps) {

    const sizeClasses = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl md:text-4xl",
    }

    const iconSizeClasses = {
        sm: "h-7 w-7",
        md: "h-9 w-9",
        lg: "h-11 w-11",
    }

    if (variant === "icon") {
        return (
            <div
                className={cn(
                    "flex items-center justify-center rounded-lg border border-foreground/8 bg-foreground/4 transition-all duration-200 hover:bg-foreground/8 hover:border-foreground/[0.14]",
                    iconSizeClasses[size]
                )}
            >
                <span className="font-sans text-sm font-semibold tracking-tight text-primary">
                    A
                </span>
            </div>
        )
    }

    return (
        <div className={cn("flex items-center", className)}>
            <span
                className={cn(
                    "font-sans uppercase font-semibold tracking-tight text-primary transition-opacity duration-200 group-hover:opacity-70",
                    sizeClasses[size]
                )}
            >
                Altruvex
            </span>
        </div>
    )
}