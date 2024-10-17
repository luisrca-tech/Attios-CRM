import { Button } from "~/components/ui/Button";
import { HydrateClient } from "~/trpc/server";

import Image from "next/image";
import TestIcon from "/public/icons/ico.png";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex max-w-48 flex-col gap-1">
        <h1 className="font-extrabold text-3xl text-primary-100">Attios CRM</h1>
        <Button>
          Click me
          <Image src={TestIcon} alt="Test Icon" />
        </Button>
        <Button>
          <Image src={TestIcon} alt="Test Icon" />
        </Button>
        <Button color="secondary">Click me</Button>
        <Button color="tertiary">Click me</Button>
        <Button color="quaternary">
          <Image src={TestIcon} alt="Test Icon" />
          Click me
        </Button>
        <Button color="quinternary">Click me</Button>
        <Button color="senary">
          <Image src={TestIcon} alt="Test Icon" />
          Click me
          <Image src={TestIcon} alt="Test Icon" />
        </Button>
        <Button color="septenary">Click me</Button>
        <Button variant="outlined" color="primary">
          Click me
        </Button>
        <Button variant="outlined" color="secondary">
          Click me
        </Button>
        <Button variant="outlined" color="tertiary">
          Click me
        </Button>
        <Button variant="outlined" color="quaternary">
          Click me
        </Button>
        <Button variant="outlined" color="quinternary">
          Click me
        </Button>
        <Button variant="outlined" color="senary">
          Click me
        </Button>
      </main>
    </HydrateClient>
  );
}
