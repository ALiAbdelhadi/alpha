declare module '*.mdx' {
    import { ComponentType } from 'react';
    const MDXContent: ComponentType;
    export default MDXContent;
}

declare module '*.md' {
    import { ComponentType } from 'react';
    const MDXContent: ComponentType;
    export default MDXContent;
}

