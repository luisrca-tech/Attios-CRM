"use client";

import { Icon } from "../ui/Icons";
import { Input } from "../ui/Input";

export function InputsText() {
  return (
    <div>
      <Input.Root className="relative max-w-[23.5rem]" fieldText="Name">
        <Input.Text
          id="name"
          renderIconLeft={() => <Icon.User />}
          className="pl-4"
          placeholder="Type..."
        />
      </Input.Root>
      <Input.Root error className="relative max-w-[23.5rem]" fieldText="Name">
        <Input.Text renderIconRight={() => <Icon.Error />} placeholder="Type..." />
      </Input.Root>
      <Input.Root fieldText="Choose an option" className="max-w-[23.5rem]">
        <Input.SelectInput
          text="Choose an option"
          options={[
            "Select item 1",
            "Select item 2",
            "Select item 3",
            "Select item 4",
          ]}
          renderIcon={(isOpen) =>
            isOpen ? <Icon.User /> : <Icon.Arrow.Down />
          }
        />
      </Input.Root>
      <Input.Root className="max-w-[23.5rem]">
        <Input.SelectInput
          text="Select an option"
          options={[
            "Select item 1",
            "Select item 2",
            "Select item 3",
            "Select item 4",
          ]}
          renderOptionIcon={() => <Icon.User />}
        />
      </Input.Root>
    </div>
  );
}
