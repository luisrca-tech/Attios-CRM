import { Icon } from '../ui/Icons/_index';

interface OrdenationButtonProps {
	column: string;
	currentDirection?: 'asc' | 'desc';
	onClick: () => void;
}

export function OrdenationButton({
	currentDirection,
	onClick
}: OrdenationButtonProps) {
	return (
		<button type="button" onClick={onClick} className="hover:opacity-80">
			<Icon.Ordenation className="h-3 w-3" />
		</button>
	);
}
