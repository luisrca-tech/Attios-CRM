"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/common/ui/Button";
import { ErrorMessage } from "~/common/ui/ErrorMessage";
import { Icon } from "~/common/ui/Icons";
import { Input } from "~/common/ui/Input";
import { ExternalAccounts } from "../components/ExternalAccounts";
import { SignUpEmailVerify } from "../components/SignUpEmailVerify";
import { Welcome } from "../components/Welcome";
import { useAuth } from "../hook/useAuth";
import { signUpFormSchema } from "../schemas/signUpForm.schema";
import { type SignUpForm } from "../types/signUpForm.type";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
  });
  const { signUpUser, emailVerify, isLoaded } = useAuth();

  if (!isLoaded) return null;

  async function onSubmit({ email, password, fullName }: SignUpForm) {
    await signUpUser({ email, password, fullName });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Welcome
        title="Welcome to our CRM. Sign Up to getting started."
        subtitle="Enter your details to proceed further"
      />
      {!emailVerify ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[22.8125rem] flex flex-col gap-4"
        >
          <Input.Root
            error={!!errors.fullName?.message}
            isValid={isSubmitSuccessful}
            fieldText="Full Name"
          >
            <Input.Text
              type="text"
              placeholder="John Doe"
              renderIconRight={() => <Icon.User />}
              {...register("fullName")}
            />
          </Input.Root>
          {errors.fullName?.message && isSubmitted && (
            <ErrorMessage message={errors.fullName.message} />
          )}
          <Input.Root
            error={!!errors.email?.message}
            isValid={isSubmitSuccessful}
            fieldText="Email"
          >
            <Input.Text
              placeholder="Johndoe@example.com"
              renderIconRight={() => <Icon.Email />}
              {...register("email")}
            />
          </Input.Root>
          {errors.email?.message && isSubmitted && (
            <ErrorMessage message={errors.email.message} />
          )}
          <Input.Root
            error={!!errors.password?.message}
            isValid={isSubmitSuccessful}
            fieldText="Password"
          >
            <Input.Password
              placeholder="********"
              {...register("password")}
              className="h-full w-full p-2 focus:border-white-400 focus:outline-white-400 font-bold text-black text-sm leading-5 placeholder:text-primary-200"
            />
          </Input.Root>
          {errors.password?.message && isSubmitted && (
            <ErrorMessage message={errors.password.message} />
          )}
          <div className="flex gap-2 mt-3">
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            <Button color="secondary" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      ) : (
        <SignUpEmailVerify />
      )}
      <ExternalAccounts />
    </div>
  );
}
