import { Button } from '~/common/components/ui/Button';
import { Icon } from '~/common/components/ui/Icons/_index';
import { cn } from '~/lib/utils';

type ViewType = 'list' | 'grid';

interface ViewTypeSelectorProps {
	viewType: ViewType;
	onViewChange: (view: ViewType) => void;
	onSort: (column: string, direction: 'asc' | 'desc') => void;
	children?: React.ReactNode;
	className?: string;
	currentSort?: { column: string; direction: 'asc' | 'desc' };
}

export function ViewTypeSelector({
	viewType,
	onViewChange,
	onSort,
	children,
	className,
	currentSort
}: ViewTypeSelectorProps) {
	return (
		<div
			className={cn(
				'flex items-center justify-between px-3 py-5 lg:px-[1.625rem]',
				className
			)}
		>
			<div className="flex w-full items-center justify-between gap-4 md:hidden lg:hidden">
				<Button
					variant="outlined"
					color="septenary"
					onClick={() => onViewChange('list')}
					className={viewType === 'list' ? 'bg-white-100' : ''}
				>
					List
				</Button>
				<Button
					variant="outlined"
					color="septenary"
					onClick={() => onViewChange('grid')}
					className={viewType === 'grid' ? 'bg-white-100' : ''}
				>
					Grid
				</Button>
				<Button
					type="button"
					onClick={() =>
						onSort(
							'name',
							currentSort?.column === 'name' && currentSort.direction === 'asc'
								? 'desc'
								: 'asc'
						)
					}
					color="septenary"
					className="h-10 w-full min-w-10"
				>
					<Icon.Trowel
						className={cn(
							'h-4 w-4',
							currentSort?.direction === 'asc' && 'rotate-180'
						)}
					/>
				</Button>
			</div>
			<div className="hidden gap-1 md:flex lg:flex">
				<Button
					className={cn(
						'px-5 py-3',
						viewType === 'list' ? 'bg-primary-100 text-white-100' : ''
					)}
					color="secondary"
					onClick={() => onViewChange('list')}
				>
					{viewType === 'list' ? <Icon.List.White /> : <Icon.List.Blue />}
					List
				</Button>
				<Button
					className={cn(
						'px-5 py-3',
						viewType === 'grid' ? 'bg-primary-100 text-white-100' : ''
					)}
					color="secondary"
					onClick={() => onViewChange('grid')}
				>
					<Icon.Grid />
					Grid
				</Button>
			</div>
			<div className="hidden md:flex lg:flex">{children}</div>
		</div>
	);
}
