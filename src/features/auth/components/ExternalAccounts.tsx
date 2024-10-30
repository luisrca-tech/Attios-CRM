import { Button } from "~/common/ui/Button";
import { Icon } from "~/common/ui/Icons";

export function ExternalAccounts() {
  return (
    <div className="flex gap-[0.375rem] mt-[4.8125rem] items-center">
      <Button variant="outlined" color="secondary">
        <Icon.Twitter />
      </Button>
      <Button variant="outlined" color="secondary">
        <Icon.Google />
      </Button>
      <Button variant="outlined" color="secondary">
        <Icon.Facebook />
      </Button>
      <span className="text-sm text-primary-200 font-normal leading-5">
        Or sign in with
      </span>
    </div>
  );
}
