"use client"

import { BackgroundShader } from "@/components/background-shader";
import { Nav } from "@/components/nav";
import { layoutChildren } from "@/types";

export function MainLayoutContent({ children }: layoutChildren) {
    return (
        <main className="relative min-h-screen w-full bg-background">
            <BackgroundShader />
            <Nav />
            <div className="relative z-10">
                {children}
            </div>
        </main>
    )
}


