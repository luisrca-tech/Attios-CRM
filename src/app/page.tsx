import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <h1 className="font-extrabold">Attios CRM</h1>
        <h2 className="font-normal">Attios CRM</h2>
        <h3 className="font-light">Attios CRM</h3>
      </main>
    </HydrateClient>
  );
}
