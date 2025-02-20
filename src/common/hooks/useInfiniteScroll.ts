import { useEffect, useRef } from 'react';

type InfiniteScrollOptions = {
	hasNextPage?: boolean;
	fetchNextPage: () => Promise<unknown>;
	threshold?: number;
};

export function useInfiniteScroll({
	hasNextPage,
	fetchNextPage,
	threshold = 0.1
}: InfiniteScrollOptions) {
	const loadMoreRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && hasNextPage) {
					void fetchNextPage();
				}
			},
			{ threshold }
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => observer.disconnect();
	}, [hasNextPage, fetchNextPage, threshold]);

	return { loadMoreRef };
}
