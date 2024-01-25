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
        ],
    },

    env: {
        server_url: "http://localhost:4000/",
        google_url: "https://drive.google.com/uc?id="
    }
}

module.exports = nextConfig
