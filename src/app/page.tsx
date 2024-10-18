import { HydrateClient } from "~/trpc/server";

import { Input } from "~/components/ui/Input";
import InputError from "/public/icons/inputError.png";
import inputIcon from "/public/icons/inputIcon.png";

const options = ["Option 1", "Option 2", "Option 3"];

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col gap-1">
        <Input.Root className="relative max-w-[23.5rem]" fieldText="Name">
          <Input.Input
            iconLeft={inputIcon}
            className="pl-4"
            placeholder="Type..."
          />
        </Input.Root>
        <Input.Root error className="relative max-w-[23.5rem]" fieldText="Name">
          <Input.Input iconRight={InputError} placeholder="Type..." />
        </Input.Root>
        <Input.Root fieldText="Choose an option" className="max-w-[23.5rem]">
          <Input.SelectInput>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Input.SelectInput>
        </Input.Root>
      </main>
    </HydrateClient>
  );
}
