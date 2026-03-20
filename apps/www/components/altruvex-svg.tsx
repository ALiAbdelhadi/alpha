import { cn } from "@/lib/utils"

type Props = {
    bgColor?: string
    textColor?: string
    sloganColor?: string
    width?: number
    height?: number
    showSlogan?: boolean
    showIcon?: boolean
    className?: string
}

export function Altruvex({
    bgColor = "transparent",
    textColor = "currentColor",
    sloganColor = "currentColor",
    width = 220,
    height = 70,
    showSlogan = false,
    showIcon = false,
    className
}: Props) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 720 220"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("flex items-center", className)}
        >
            {bgColor !== "transparent" && (
                <rect width="100%" height="100%" fill={bgColor} />
            )}

            {showIcon && (
                <g transform="translate(92,112)" fill={textColor}>

                    {/* V left */}
                    <polygon points="-60,-70 -40,-70 -6,10 -26,10" />

                    {/* V right */}
                    <polygon points="40,-70 60,-70 26,10 6,10" />

                    {/* pivot */}
                    <rect x="-6" y="14" width="12" height="8" rx="2" />

                    {/* X bottom left */}
                    <polygon points="-28,24 -12,24 -30,54 -46,54" />

                    {/* X bottom right */}
                    <polygon points="12,24 28,24 46,54 30,54" />
                </g>
            )}

            <text
                x="210"
                y="100"
                fontFamily="Outfit, Inter, sans-serif"
                fontSize="52"
                fontWeight="600"
                letterSpacing="3"
                fill={textColor}
                className={cn("font-sans uppercase font-semibold tracking-tight transition-opacity duration-200 group-hover:opacity-70", className)}
            >
                altruvex
            </text>

            {showSlogan && (
                <text
                    x="212"
                    y="138"
                    fontFamily="Inter, sans-serif"
                    fontSize="15"
                    fontWeight="400"
                    letterSpacing="2.5"
                    fill={sloganColor}
                    opacity="0.8"
                >
                    Engineering Beyond Standards
                </text>
            )}
        </svg>
    )
}