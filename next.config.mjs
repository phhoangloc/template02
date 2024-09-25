/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "buoncf.jp",
                port: "",
                pathname: "/template2/**"
            },
        ],
    },
    env: {
        HOMEPAGE_URL: "https://buoncf.jp/",
        ftp_url: "https://buoncf.jp/template2/",

    }
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default nextConfig;
