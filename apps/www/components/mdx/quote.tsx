interface QuoteProps {
    author: string;
    role?: string;
    children: React.ReactNode;
}

export function Quote({ author, role, children }: QuoteProps) {
    return (
        <figure className="my-8 ltr:border-l-4 rtl:border-r-4 border-primary ltr:pl-6 rtl:pr-6">
            <blockquote className="mb-4 text-xl italic text-foreground/75">
                {children}
                
            </blockquote>
            <figcaption className="text-sm">
                <span className="font-semibold text-foreground">{author}</span>
                {role && <span className="text-foreground/60">, {role}</span>}
            </figcaption>
        </figure>
    );
}