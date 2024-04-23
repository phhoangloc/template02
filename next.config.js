/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['drive.google.com'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
            },
            {
                protocol: 'https',
                hostname: 'locpham.blog',
            },
        ],
    },

    env: {
        ftp_url: "https://locpham.blog/",
        server_url: "http://localhost:4000/",
        server_url_: "https://ba-locpham.vercel.app/",
        google_url: "https://drive.google.com/uc?id="
    }
}

module.exports = nextConfig
