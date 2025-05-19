export function useSubdomain() {
	const url = window.location.hostname;
	const subdomain = url.split('.')[0];

	return { subdomain };
}
