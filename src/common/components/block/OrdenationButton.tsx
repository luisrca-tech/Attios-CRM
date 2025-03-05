import { cn } from '~/lib/utils';
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
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'hover:opacity-80',
				currentDirection === 'asc' ? 'rotate-180' : ''
			)}
		>
			<Icon.Ordenation className="h-3 w-3" />
		</button>
	);
}
