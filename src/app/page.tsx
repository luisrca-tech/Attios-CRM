import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <h1 className="text-3xl font-extrabold">Attios CRM</h1>
        <h2 className="text-xs font-normal">Attios CRM</h2>
        <h3 className="text-base font-light">Attios CRM</h3>
      </main>
    </HydrateClient>
  );
}
