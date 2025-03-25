import { cn } from '~/lib/utils';
import type { StatusType } from '../types/invoiceFilters.type';
import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '~/common/components/ui/carousel';

interface StatusFilterProps {
	status: StatusType;
	onStatusChange: (status: StatusType) => void;
	className?: string;
}

const statusOptions: { value: StatusType; label: string }[] = [
	{ value: 'All', label: 'All' },
	{ value: 'Draft', label: 'Draft' },
	{ value: 'Paid', label: 'Paid' },
	{ value: 'Unpaid', label: 'Unpaid' },
	{ value: 'Scheduled', label: 'Scheduled' }
];

export function StatusFilter({
	status,
	onStatusChange,
	className
}: StatusFilterProps) {
	return (
		<>
			<div className={cn('hidden gap-2 lg:flex', className)}>
				{statusOptions.map((option) => (
					<button
						type="button"
						key={option.value}
						onClick={() => onStatusChange(option.value)}
						className={cn(
							'flex h-10 w-20 items-center justify-center rounded-lg bg-transparent font-bold text-primary-200 text-sm leading-5',
							status === option.value && 'border border-white-400 text-black'
						)}
					>
						{option.label}
					</button>
				))}
			</div>
			<Carousel opts={{ loop: true }} className="lg:hidden">
				<CarouselContent>
					{statusOptions.map((option) => (
						<CarouselItem className="basis-24" key={option.value}>
							<button
								type="button"
								className={cn(
									'flex w-full items-center justify-center rounded-lg bg-transparent font-bold text-primary-200 text-sm leading-5',
									status === option.value &&
										'border border-white-400 text-black'
								)}
							>
								{option.label}
							</button>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</>
	);
}
