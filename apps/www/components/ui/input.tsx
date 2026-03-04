import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-primary placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 bg-transparent px-0 py-2.5 text-base transition-all transition-default outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "border-b border-foreground/25 focus:border-foreground/50 focus-visible:outline-none",
        "aria-invalid:border-destructive focus-visible:aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
