import { HydrateClient } from "~/trpc/server";

import { InputIcon } from "~/components/Icons/Input";
import { Icon } from "~/components/Icons/User";
import { Input } from "~/components/ui/Input";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col gap-1">
        <Input.Root className="relative max-w-[23.5rem]" fieldText="Name">
          <Input.Text
            id="name"
            iconLeft={<Icon.User />}
            className="pl-4"
            placeholder="Type..."
          />
        </Input.Root>
        <Input.Root error className="relative max-w-[23.5rem]" fieldText="Name">
          <Input.Text iconRight={<InputIcon.Error />} placeholder="Type..." />
        </Input.Root>
        <Input.Root fieldText="Choose an option" className="max-w-[23.5rem]">
          <Input.SelectInput
            options={[
              "Select item 1",
              "Select item 2",
              "Select item 3",
              "Select item 4",
            ]}
          />
        </Input.Root>
        <Input.Root className="max-w-[23.5rem]">
          <Input.SelectInput
            text="Select an option"
            iconLeft={<Icon.User />}
            options={[
              "Select item 1",
              "Select item 2",
              "Select item 3",
              "Select item 4",
            ]}
          />
        </Input.Root>
      </main>
    </HydrateClient>
  );
}
