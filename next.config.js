/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		DATABASE_URL: process.env.DATABASE_URL
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com'
			},
			{
				protocol: 'https',
				hostname: 'loremflickr.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'faker.cloudflare.com',
				port: '',
				pathname: '/**'
			}
		]
	}
};

export default nextConfig;
