import { HydrateClient } from '~/trpc/server';

export default async function Home() {
	return (
		<HydrateClient>
			<main>
				<h1>Attios CRM</h1>
			</main>
		</HydrateClient>
	);
}
