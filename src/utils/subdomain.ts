export const getSubdomain = (subDomain: string) => {
	if (process.env.NODE_ENV === 'production') {
		return `https://${subDomain}.${process.env.VERCEL_URL}`;
	}
	return `http://${subDomain}.localhost:3000`;
};
