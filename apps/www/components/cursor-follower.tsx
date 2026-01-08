"use client"
import { ArrowRight, GripVertical } from "lucide-react"
import { useState } from "react"

// components/cursor-follower.tsx (جديد)
export function CursorFollower() {
    const [hovered, setHovered] = useState<string | null>(null)

    return (
        <div className="cursor-follower">
            {hovered === 'view-project' && (
                <div className="absolute">
                    <span className="text-sm">View</span>
                    <ArrowRight className="ml-2" />
                </div>
            )}

            {hovered === 'drag' && (
                <div className="cursor-drag">
                    <GripVertical />
                </div>
            )}
        </div>
    )
}