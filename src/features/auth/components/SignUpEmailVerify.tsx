"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/common/ui/Button";
import { Input } from "~/common/ui/Input";
import { useAuth } from "../hook/useAuth";
import { signUpEmailVerifySchema } from "../schemas/signUpEmailVerify.schema";
import { type SignUpEmailVerify } from "../types/signUpEmailVerify.type";

export function SignUpEmailVerify() {
  const { register, handleSubmit } = useForm<SignUpEmailVerify>({
    resolver: zodResolver(signUpEmailVerifySchema),
    mode: "onChange",
  });
  const { verifyEmail, resendCode, isLoading } = useAuth();

  async function handleConfirmCode({ code }: SignUpEmailVerify) {
    await verifyEmail({ code });
  }

  return (
    <form
      onSubmit={handleSubmit(handleConfirmCode)}
      className="w-[22.8125rem] flex flex-col gap-4"
    >
      <Input.Root fieldText="Code">
        <Input.Password placeholder="********" {...register("code")} />
      </Input.Root>
      <div className="flex gap-2 mt-3">
        <Button type="submit" className="w-full" isLoading={isLoading}>
          Confirm
        </Button>
        <Button className="w-full" color="secondary" onClick={resendCode}>
          Resend code
        </Button>
      </div>
    </form>
  );
}
