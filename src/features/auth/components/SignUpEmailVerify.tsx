"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/common/ui/Button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/common/ui/input-otp";
import { useAuth } from "../hook/useAuth";
import { signUpEmailVerifySchema } from "../schemas/signUpEmailVerify.schema";
import { type SignUpEmailVerify } from "../types/signUpEmailVerify.type";

export function SignUpEmailVerify() {
  const { setValue, handleSubmit } = useForm<SignUpEmailVerify>({
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
      <div className="flex justify-center items-center pb-4">
        <InputOTP maxLength={6} onChange={(value) => setValue("code", value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
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
