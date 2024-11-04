import { UserButton } from "@clerk/nextjs";
import { HydrateClient } from "~/trpc/server";
export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col gap-1">
        <UserButton />
      </main>
    </HydrateClient>
  );
}
