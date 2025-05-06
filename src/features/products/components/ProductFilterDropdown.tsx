import {
	DropdownMenuContent,
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '~/common/components/ui/dropdown-menu';
import { Icon } from '~/common/components/ui/Icons/_index';

interface ProductFilterDropdownProps {
	text: string;
	type: 'quantity' | 'price';
	filtersCondition: string[];
	onFilterChange: (type: 'quantity' | 'price', filter: string) => void;
}

export function ProductFilterDropdown({
	text,
	type,
	filtersCondition,
	onFilterChange
}: ProductFilterDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 font-bold text-primary-200 text-sm transition-colors duration-200 hover:bg-primary-100 hover:text-white-100">
				<Icon.Arrow.Down className="h-3 w-3 text-primary-200" />
				{text}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-white-100">
				{filtersCondition.map((filter) => (
					<DropdownMenuItem
						className="font-bold text-base text-black leading-6 transition-colors duration-200 hover:bg-primary-100 hover:text-white-100"
						key={filter}
						onClick={() => onFilterChange(type, filter)}
					>
						{filter}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
