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
			}
		]
	}
};

export default nextConfig;
