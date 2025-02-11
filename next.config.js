/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

// TODO: Remove this once we have a real image source
const mockImagesHosts = [
	'loremflickr.com',
	'picsum.photos',
	'faker.cloudflare.com'
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: process.env.NODE_ENV !== 'test',
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
				hostname: 'utfs.io',
				pathname: '/**'
			},
			...mockImagesHosts.map(
				(host) =>
					/** @type {const} */({
					protocol: 'https',
					hostname: host,
					port: '',
					pathname: '/**'
				})
			)
		]
	}
};

export default nextConfig;
