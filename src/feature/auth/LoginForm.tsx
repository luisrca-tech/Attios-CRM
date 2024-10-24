import { Input } from "~/common/ui/Input";
import { Welcome } from "./components/Welcome";
import { Icon } from "~/common/ui/Icons";
import { Button } from "~/common/ui/Button";
import { ExternalAccounts } from "./components/ExternalAccounts";

export function LoginForm() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Welcome
        title="Welcome to our CRM. Sign Up to getting started."
        subtitle="Enter your details to proceed further"
      />
      <form className="w-[22.8125rem] flex flex-col gap-4">
        <Input.Root fieldText="Full Name">
          <Input.Text
            placeholder="John Doe"
            renderIconRight={() => <Icon.User />}
          />
        </Input.Root>
        <Input.Root fieldText="Email">
          <Input.Text
            placeholder="Johndoe@example.com"
            renderIconRight={() => <Icon.Email />}
          />
        </Input.Root>
        <Input.Root fieldText="Password">
          <Input.Text
            placeholder="********"
            renderIconRight={() => <Icon.Password />}
          />
        </Input.Root>
        <div className="flex gap-2 mt-3">
          <Button className="w-full">Sign Up</Button>
          <Button color="secondary" className="w-full">Sign In</Button>
        </div>
      </form>
      <ExternalAccounts />
    </div>
  );
}
