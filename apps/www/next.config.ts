import createMDX from '@next/mdx';
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
    runtimeCaching: [
        {
            urlPattern: /^https?.*/,
            handler: "NetworkFirst",
            options: {
                cacheName: "offlineCache",
                expiration: {
                    maxEntries: 200,
                },
            },
        },
    ],
});
const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [
                rehypePrettyCode,
                {
                    theme: 'github-dark',
                    keepBackground: false,
                },
            ],
        ],
    },
});
const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    transpilePackages: ["@repo/database"],
    compiler: {
        styledComponents: true,
    },
    compress: true,
    poweredByHeader: false,
};

const withNextIntl = createNextIntlPlugin();
let config = withNextIntl(nextConfig);
config = withPWA(config);
config = withMDX(config)

export default config;