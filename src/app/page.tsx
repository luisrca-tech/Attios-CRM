import { InputsText } from "~/common/Test/InputsText";
import { HydrateClient } from "~/trpc/server";
export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col gap-1">
        <h1>Text</h1>
        <InputsText />
      </main>
    </HydrateClient>
  );
}
