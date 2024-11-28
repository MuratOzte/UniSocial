/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
                port: '',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'media-ist1-1.cdn.whatsapp.net',
                port: '',
                pathname: '/v/t61.24694-24/**',
            }
        ],
    },
};

export default nextConfig;
