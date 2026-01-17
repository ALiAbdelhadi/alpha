"use client"
import { Nav } from "@/components/nav";
import { layoutChildren } from "@/types";
import dynamic from 'next/dynamic';

const BackgroundShader = dynamic(() => import("@/components/background-shader").then(mod => ({ default: mod.BackgroundShader })), {
    ssr: false,
    loading: () => (
        <div className="fixed inset-0 z-0 bg-linear-to-b from-background via-background/95 to-background" />
    )
});

export function MainLayoutContent({ children }: layoutChildren) {
    return (
        <main className="relative min-h-screen w-full bg-gray-100/40 dark:bg-gray-900/40">
            {/* <BackgroundShader /> */}
            <Nav />
            <div id="main-content" className="relative z-10">
                {children}
            </div>
        </main>
    )
}