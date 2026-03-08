"use client"

import { useRouter } from "next/navigation"
import { AboutSection } from "@/components/sections/about-section"

export default function AboutPage() {
    const router = useRouter()

    const handleScrollToSection = (sectionId: string) => {
        if (sectionId === "contact") {
            router.push("/contact")
        } else if (sectionId === "work") {
            router.push("/work")
        }
    }

    return <AboutSection scrollToSection={handleScrollToSection} />
}

