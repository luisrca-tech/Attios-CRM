import { Skeleton } from '~/common/components/ui/skeleton';

export function ProductGridSkeleton() {
	return (
		<div className="flex h-full flex-col justify-between rounded-xl bg-white-100 lg:border lg:border-white-400">
			<div className="flex justify-between p-4">
				<Skeleton className="h-5 w-5 rounded-md" />
				<Skeleton className="h-5 w-5 rounded-md" />
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<Skeleton className="h-20 w-20 rounded-lg" />
				<div className="flex flex-col items-center">
					<div className="flex items-center gap-1">
						<Skeleton className="h-5 w-20 rounded-md" />
						<Skeleton className="h-5 w-20 rounded-md" />
					</div>
					<Skeleton className="h-5 w-20 rounded-md" />
				</div>
			</div>
			<div className="3xl:mt-8 mt-4 flex w-full border-white-400 border-t">
				<div className="flex flex-1 items-center justify-center border-white-400 border-r py-4">
					<Skeleton className="h-5 w-20 rounded-md" />
				</div>
				<div className="flex flex-1 items-center justify-center py-4">
					<Skeleton className="h-5 w-20 rounded-md" />
				</div>
			</div>
		</div>
	);
}
