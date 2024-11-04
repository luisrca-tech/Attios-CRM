import { Button } from "~/common/components/ui/Button";
import { Icon } from "~/common/components/ui/Icons";

export function SocialAuth() {
  return (
    <div className="flex gap-[0.375rem] mt-[4.8125rem] items-center">
      <Button variant="outlined" color="secondary">
        <Icon.Social.Twitter />
      </Button>
      <Button variant="outlined" color="secondary">
        <Icon.Social.Google />
      </Button>
      <Button variant="outlined" color="secondary">
        <Icon.Social.Facebook />
      </Button>
      <span className="text-sm text-primary-200 font-normal leading-5">
        Or sign in with
      </span>
    </div>
  );
}
