import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

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

const nextConfig: NextConfig = {
    turbopack: {},
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

export default config;