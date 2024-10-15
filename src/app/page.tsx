import { HydrateClient } from '~/trpc/server';

export default async function Home() {
	return (
		<HydrateClient>
			<main>
				<h1 className="font-extrabold text-3xl">Attios CRM</h1>
				<h2 className="font-normal text-xs">Attios CRM</h2>
				<h3 className="font-light text-base">Attios CRM</h3>
			</main>
		</HydrateClient>
	);
}
