import { useEffect, useRef } from 'react';

type InfiniteScrollOptions = {
	canLoadMore?: boolean;
	fetchMore: () => Promise<unknown>;
	threshold?: number;
};

export function useInfiniteScroll({
	canLoadMore,
	fetchMore,
	threshold = 0.1
}: InfiniteScrollOptions) {
	const loadMoreRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && canLoadMore) {
					void fetchMore();
				}
			},
			{ threshold }
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => observer.disconnect();
	}, [canLoadMore, fetchMore, threshold]);

	return { loadMoreRef };
}
