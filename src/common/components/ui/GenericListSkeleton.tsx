import { Skeleton } from '~/common/components/ui/skeleton';

export function GenericListSkeleton() {
	return (
		<div className="flex w-full items-center justify-between rounded-xl bg-white-100 px-[1.625rem] py-[0.6875rem] md:hidden lg:hidden">
			<div className="flex gap-4">
				<Skeleton className="h-[3.25rem] w-[3.25rem] rounded-md" />
				<div className="flex flex-col gap-1">
					<Skeleton className="h-5 w-full rounded-md" />
					<Skeleton className="h-5 w-20 rounded-md" />
				</div>
			</div>
			<Skeleton className="h-9 w-9 rounded-md" />
		</div>
	);
}
