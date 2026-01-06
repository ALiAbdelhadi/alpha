import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface AlphaLogoProps {
    className?: string
    size?: "sm" | "md" | "lg"
    variant?: "full" | "icon"
}

export function AlphaLogo({ className, size = "md", variant = "full" }: AlphaLogoProps) {
    const t = useTranslations("logo")
    const sizeClasses = {
        sm: "text-2xl",
        md: "text-3xl",
        lg: "text-4xl md:text-5xl",
    }

    const iconSizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
    }

    if (variant === "icon") {
        return (
            <div
                className={cn(
                    "flex items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25",
                    iconSizeClasses[size]
                )}
            >
                <span className="font-sans text-xl font-bold bg-linear-to-r from-teal-700 via-teal-500 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                    A
                </span>
            </div>
        )
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <span
                className={cn(
                    "font-sans uppercase font-semibold tracking-tight bg-linear-to-r from-teal-700 via-teal-500 via-cyan-400 to-cyan-300 bg-clip-text text-transparent",
                    sizeClasses[size]
                )}
            >
                {t("logo")}
            </span>
        </div>
    )
}