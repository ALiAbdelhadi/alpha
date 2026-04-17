import * as React from "react"

import { cn } from "@/lib/utils"

const normalizeNumbers = (str: string) => {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  if (!str || typeof str !== "string") return str;
  return str
    .replace(/[٠-٩]/g, (w) => arabicNumbers.indexOf(w).toString())
    .replace(/[۰-۹]/g, (w) => persianNumbers.indexOf(w).toString());
};

function Input({ className, type, onChange, ...props }: React.ComponentProps<"input">) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "number" || type === "tel" || props.inputMode === "numeric") {
        e.target.value = normalizeNumbers(e.target.value);
      }
      onChange?.(e);
    },
    [onChange, type, props.inputMode]
  );

  return (
    <input
      type={type}
      data-slot="input"
      onChange={handleChange}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-accent selection:text-accent-foreground",
        "h-9 w-full min-w-0 bg-transparent px-0 py-2.5 text-base outline-none transition-[border-color] md:text-sm",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "border-b border-border focus:border-accent",
        "focus-visible:outline-none",
        "aria-invalid:border-destructive",
        className
      )}
      style={{ borderRadius: 0, transitionDuration: "var(--duration-instant)", transitionTimingFunction: "var(--ease-default)" }}
      {...props}
    />
  )
}

export { Input }
