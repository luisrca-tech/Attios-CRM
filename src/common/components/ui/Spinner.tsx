export function Spinner({ label = 'Loading...' }: { label?: string }) {
	return (
		<div
			role="progressbar"
			aria-busy="true"
			aria-label={label}
			aria-valuenow={0}
			aria-valuemin={0}
			aria-valuemax={100}
			tabIndex={0}
			className="h-4 w-4 animate-spin rounded-full border-white-100 border-t-2 border-b-2"
		/>
	);
}
