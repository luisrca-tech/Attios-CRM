import { HydrateClient } from '~/trpc/server';
import Dashboard from './Dashboard/page';

export default async function Home() {
	return (
		<HydrateClient>
			<Dashboard />
		</HydrateClient>
	);
}
