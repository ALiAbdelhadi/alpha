import { layoutChildren } from "@/types";

export default function MainLayout({ children }: layoutChildren) {
    return (
        <>
            <main>
                {children}
            </main>
        </>
    )
}