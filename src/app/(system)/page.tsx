import { HydrateClient } from '~/trpc/server';
import Dashboard from './dashboard/page';

export default async function Home() {
	return (
		<HydrateClient>
			<Dashboard />
		</HydrateClient>
	);
}
