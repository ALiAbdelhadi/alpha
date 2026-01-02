import { layoutChildren } from "@/types";
import { generateMetadata as generatePageMetadata, generateStructuredData } from "@/lib/metadata";
import Script from "next/script";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return generatePageMetadata(locale);
}

export default function MainLayout({ children }: layoutChildren) {
    const structuredData = generateStructuredData();

    return (
        <>
            <Script
                id="structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <main>
                {children}
            </main>
        </>
    )
}