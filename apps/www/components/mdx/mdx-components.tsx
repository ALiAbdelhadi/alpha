import { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { Callout } from './callout';
import { CodeBlock } from './code-block';
import { Quote } from './quote';

export const mdxComponents: MDXComponents = {
    h1: ({ children, id }) => (
        <h1 id={id} className="mb-6 mt-12 font-sans text-4xl font-bold tracking-tight">
            {children}
        </h1>
    ),
    h2: ({ children, id }) => (
        <h2 id={id} className="mb-4 mt-10 font-sans text-3xl font-semibold tracking-tight">
            {children}
        </h2>
    ),
    h3: ({ children, id }) => (
        <h3 id={id} className="mb-3 mt-8 font-sans text-2xl font-semibold">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="mb-6 text-lg leading-relaxed text-foreground/85">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="my-6 ml-6 list-disc space-y-2">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="my-6 ml-6 list-decimal space-y-2">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="text-base leading-relaxed text-foreground/85">
            {children}
        </li>
    ),
    a: ({ href, children }) => (
        <Link
            href={href as string}
            className="text-primary underline-offset-4 hover:underline"
        >
            {children}
        </Link>
    ),
    img: ({ src, alt }) => (
        <Image
            src={src as string}
            alt={alt as string}
            width={1200}
            height={630}
            className="my-8 rounded-lg"
        />
    ),
    blockquote: ({ children }) => (
        <blockquote className="my-6 border-l-4 border-primary pl-6 italic text-foreground/75">
            {children}
        </blockquote>
    ),
    code: ({ children, className }) => {
        const isInline = !className;
        if (isInline) {
            return (
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    {children}
                </code>
            );
        }
        return <code className={className}>{children}</code>;
    },
    pre: CodeBlock,
    Callout,
    Quote,
};