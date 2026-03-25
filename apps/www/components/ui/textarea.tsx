import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full bg-transparent px-0 py-2.5 text-base transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
        "border-b border-foreground/25 focus:border-foreground/50 focus-visible:outline-none",
        "aria-invalid:border-destructive focus-visible:aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
