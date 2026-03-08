"use client"

import { cn } from "@/lib/utils"

interface SuccessIconProps {
    size?: number
    strokeWidth?: number
    color?: string
    className?: string
}

const CIRCLE_LENGTH = 2 * Math.PI * 40
const CHECK_LENGTH = 55

export function SuccessIcon({
    size = 20,
    strokeWidth = 4,
    color = "currentColor",
    className = "",
}: SuccessIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className={cn("success-icon-draw", className)}
        >
            <title>Animated Success Icon</title>
            <circle
                cx="50"
                cy="50"
                r="40"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={CIRCLE_LENGTH}
                strokeDashoffset={CIRCLE_LENGTH}
                className="success-icon-circle"
            />
            <path
                d="M30 50L45 65L70 35"
                stroke={color}
                strokeWidth={strokeWidth + 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="transparent"
                strokeDasharray={CHECK_LENGTH}
                strokeDashoffset={CHECK_LENGTH}
                className="success-icon-check"
            />
            <style>{`
                .success-icon-draw .success-icon-circle {
                    animation: success-icon-draw-circle 1.2s ease-out 0s forwards;
                }
                .success-icon-draw .success-icon-check {
                    animation: success-icon-draw-check 0.6s ease-out 0.2s forwards;
                }
                @keyframes success-icon-draw-circle {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                @keyframes success-icon-draw-check {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>
        </svg>
    )
}
