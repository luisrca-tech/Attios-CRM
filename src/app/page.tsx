import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <h1 className="text-primary-100">Attios CRM</h1>
        <h1 className="text-black">Attios CRM</h1>
        <h1 className="text-primary-200">Attios CRM</h1>
        <h1 className="text-secondary-400">Attios CRM</h1>
      </main>
    </HydrateClient>
  );
}
