'use client'

import { cn } from "@/lib/utils"

export const LoadingIcon = ({
  size = 20,
  className,
}: {
  size?: number
  className?: string
}) => {
  return (
    <span
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-0 rounded-full border border-border/40" />
      <span className="absolute inset-0 animate-spin">
        <span className="absolute top-0 left-1/2 -translate-x-1/2">
          <span
            className="block rounded-full bg-foreground"
            style={{
              width: size * 0.18,
              height: size * 0.18,
            }}
          />
        </span>
      </span>
    </span>
  )
}