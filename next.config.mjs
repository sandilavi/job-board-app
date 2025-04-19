/** @type {import('next').NextConfig} */
const nextConfig = {
    //Middleware configuration for restricted pages
    middleware: ['/admin/*'],
};

export default nextConfig;
