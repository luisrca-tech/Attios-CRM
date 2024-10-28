import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/common/ui/Button";
import { Input } from "~/common/ui/Input";
import { signUpEmailVerifySchema } from "../schemas/signUpEmailVerify.schema";
import { type SignUpEmailVerify } from "../types/signUpEmailVerify.type";

export function SignUpEmailVerify() {
  const { register } = useForm<SignUpEmailVerify>({
    resolver: zodResolver(signUpEmailVerifySchema),
    mode: "onChange",
  });

  return (
    <form className="w-[22.8125rem] flex flex-col gap-4">
      <Input.Root fieldText="Password">
        <Input.Password placeholder="********" {...register("code")} />
      </Input.Root>
      <div className="flex gap-2 mt-3">
        <Button className="w-full">Resend code</Button>
        <Button color="secondary" className="w-full">
          Confirm
        </Button>
      </div>
    </form>
  );
}
