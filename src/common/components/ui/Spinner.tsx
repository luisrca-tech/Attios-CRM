export function Spinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div 
      role="progressbar"
      aria-busy="true"
      aria-label={label}
      className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white-100" 
    />
  );
}
