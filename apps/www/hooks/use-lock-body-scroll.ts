"use client"

import { useLayoutEffect } from "react"

/**
 * Hook to lock the body scroll when a component is mounted.
 * Useful for modals, nav menus, etc.
 * 
 * @param locked Whether to lock the scroll
 */
export function useLockBodyScroll(locked: boolean = true) {
  useLayoutEffect(() => {
    if (!locked) return

    const originalStyle = window.getComputedStyle(document.body).overflow
    
    // Lock scroll
    document.body.style.overflow = "hidden"
    
    // Ensure the scroll bar disappearing doesn't cause a layout shift
    // (Optional: add padding-right based on scrollbar width if needed)
    
    return () => {
      // Restore scroll
      document.body.style.overflow = originalStyle
    }
  }, [locked])
}
