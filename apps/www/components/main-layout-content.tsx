"use client"
import { Nav } from "@/components/nav";
import { layoutChildren } from "@/types";
import dynamic from 'next/dynamic';
import Footer from "./footer";
import { WhatsAppFloat } from "./whatsapp-cta";

export function MainLayoutContent({ children }: layoutChildren) {
    return (
        <main className="relative min-h-screen w-full bg-gray-100/40 dark:bg-gray-900/40">
            <Nav />
            <div id="main-content" className="relative z-10">
                {children}
            </div>
            <Footer />
            <WhatsAppFloat />
        </main>
    )
}
