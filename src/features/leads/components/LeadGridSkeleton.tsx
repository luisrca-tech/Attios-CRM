import { Skeleton } from '~/common/components/ui/skeleton';

export function LeadGridSkeleton() {
	return (
		<div className="flex h-full flex-col justify-between rounded-xl bg-white-100 lg:border lg:border-white-400">
			<div className="flex justify-end p-4">
				<Skeleton className="h-9 w-9" />
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<Skeleton className="h-20 w-20 rounded-lg" />
				<div className="flex flex-col items-center gap-1">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-8 w-24" />
				</div>
			</div>
			<div className="mt-4 flex w-full border-white-400 border-t">
				<div className="flex flex-1 items-center justify-center border-white-400 border-r py-4">
					<Skeleton className="h-4 w-16" />
				</div>
				<div className="flex flex-1 items-center justify-center py-4">
					<Skeleton className="h-4 w-16" />
				</div>
			</div>
		</div>
	);
}
