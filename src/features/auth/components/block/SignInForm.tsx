"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, LinkButton } from "~/common/components/ui/Button";
import ErrorMessage from "~/common/components/ui/ErrorMessage";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";
import { useAuth } from "../../hook/useAuth";
import { signInFormSchema } from "../../schemas/signInForm.schema";
import type { SignInFormType } from "../../types/signInForm.type";
import { WelcomeHeading } from "../ui/WelcomeHeading";
import { useWorkspace } from "~/features/workspace/hooks/useWorkspace";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
  });
  const { signInUser, isSignInLoaded } = useAuth();
  const { workspace } = useWorkspace();

  if (!isSignInLoaded) return null;

  async function onSubmit({ email, password }: SignInFormType) {
    await signInUser({ email, password });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <WelcomeHeading
        title={`Welcome to ${workspace}'s. Sign In to see latest updates.`}
        subtitle="Enter your details to proceed further"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[22.8125rem] flex-col gap-2"
      >
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
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
        <Input.Root
          error={!!errors.password?.message}
          isValid={isSubmitSuccessful}
          fieldText="Password"
        >
          <Input.Password
            placeholder="********"
            {...register("password")}
            className="h-full w-full p-2 font-bold text-black text-sm leading-5 placeholder:text-primary-200 focus:border-white-400 focus:outline-white-400"
          />
        </Input.Root>
        {errors.password?.message && isSubmitted && (
          <ErrorMessage>
            <p>{errors.password.message}</p>
          </ErrorMessage>
        )}
        <LinkButton
          href="/recover-password"
          className="justify-end bg-transparent px-0 font-bold text-primary-100 text-sm leading-4 hover:bg-transparent hover:opacity-70"
          type="button"
        >
          Recover password
        </LinkButton>
        <div className="mt-3 flex gap-2">
          <Button
            isLoading={isSubmitting}
            type="submit"
            className="w-full"
          >
            Sign In
          </Button>
        </div>
      </form>
      {/* <SocialAuth /> */}
    </div>
  );
}
