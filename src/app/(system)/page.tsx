import { ContentSidebar } from '~/features/auth/components/block/ContentSidebar';
import { HydrateClient } from '~/trpc/server';
export default async function Home() {
	return (
		<HydrateClient>
			<div className="flex gap-1">
				<ContentSidebar.Page.Dashboard />
			</div>
		</HydrateClient>
	);
}
