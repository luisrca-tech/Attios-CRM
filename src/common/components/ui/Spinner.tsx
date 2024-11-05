export function Spinner({ label = 'Loading...' }: { label?: string }) {
	return (
		<div
			role="progressbar"
			aria-busy="true"
			aria-label={label}
			className="h-4 w-4 animate-spin rounded-full border-white-100 border-t-2 border-b-2"
		/>
	);
}
