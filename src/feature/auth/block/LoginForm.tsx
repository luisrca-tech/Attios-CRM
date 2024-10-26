"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/common/ui/Button";
import { ErrorMessage } from "~/common/ui/ErrorMessage";
import { Icon } from "~/common/ui/Icons";
import { Input } from "~/common/ui/Input";
import { ExternalAccounts } from "../components/ExternalAccounts";
import { Welcome } from "../components/Welcome";
import { loginFormSchema } from "../schemas/loginForm.schema";
import { type LoginForm } from "../types/loginForm.type";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Welcome
        title="Welcome to our CRM. Sign Up to getting started."
        subtitle="Enter your details to proceed further"
      />
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
        {errors.fullName?.message && (
          <ErrorMessage message={errors.fullName.message} />
        )}
        <Input.Root
          error={!!errors.email?.message}
          isValid={isSubmitSuccessful}
          fieldText="Email"
        >
          <Input.Text
            type="email"
            placeholder="Johndoe@example.com"
            renderIconRight={() => <Icon.Email />}
            {...register("email")}
          />
        </Input.Root>
        {errors.email?.message && (
          <ErrorMessage message={errors.email.message} />
        )}
        <Input.Root
          error={!!errors.password?.message}
          isValid={isSubmitSuccessful}
          fieldText="Password"
        >
          <Input.Password placeholder="********" {...register("password")} />
        </Input.Root>
        {errors.password?.message && (
          <ErrorMessage message={errors.password.message} />
        )}
        <div className="flex gap-2 mt-3">
          <Button className="w-full">Sign Up</Button>
          <Button color="secondary" className="w-full">
            Sign In
          </Button>
        </div>
      </form>
      <ExternalAccounts />
    </div>
  );
}
