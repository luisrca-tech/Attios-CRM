import { Skeleton } from '~/common/components/ui/skeleton';

export function DashboardListSkeleton() {
	return (
		<div className="flex h-[4.625rem] justify-between rounded-[0.625rem] bg-white-100 px-[0.875rem] md:hidden">
			<div className="flex items-center justify-center gap-4">
				<Skeleton className="h-[3.25rem] w-[3.25rem] rounded-lg" />
				<div className="flex flex-col gap-1">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-4 w-20" />
				</div>
			</div>
			<div className="pt-4">
				<Skeleton className="h-4 w-16" />
			</div>
		</div>
	);
}
