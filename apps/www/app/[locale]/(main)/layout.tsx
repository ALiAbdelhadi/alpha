import { MainLayoutContent } from "@/components/main-layout-content";
import { generateMetadata as generatePageMetadata, generateStructuredData } from "@/lib/metadata";
import Script from "next/script";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return generatePageMetadata(locale);
}

type MainLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function MainLayout({ children, params }: MainLayoutProps) {
    const structuredData = generateStructuredData();
    await params;

    return (
        <>
            <Script
                id="structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <MainLayoutContent>
                {children}
            </MainLayoutContent>
        </>
    )
}