import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "~/common/hooks/use-toast";
import { api } from "~/trpc/react";
import { SignUpEmailVerify } from "../types/signUpEmailVerify.type";
import { SignUpForm } from "../types/signUpForm.type";

export function useAuth() {
  const router = useRouter();
  const [emailVerify, setEmailVerify] = useState<boolean>(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const { toast } = useToast();

  const userMutation = api.user.create.useMutation();

  async function signUpUser({ email, password, fullName }: SignUpForm) {
    try {
      await signUp?.create({
        emailAddress: email,
        password,
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ")[1],
      });
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      setEmailVerify(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast({
          title: "Error",
          description: error?.errors[0]?.longMessage,
          variant: "destructive",
        });
      }
      return toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  async function verifyEmail({ code }: SignUpEmailVerify) {
    if (!isLoaded) return null;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (!completeSignUp.createdUserId) {
        throw new Error("Id was not provided");
      }

      if (completeSignUp.status === "complete") {
        const email = completeSignUp.emailAddress;

        if (!email) {
          return toast({
            title: "Error",
            description: "Email or name was not provided",
            variant: "destructive",
          });
        }

        await userMutation.mutateAsync({
          userId: completeSignUp.createdUserId,
          email: email,
          fullName: `${completeSignUp.firstName} ${completeSignUp.lastName}`,
        });
        await setActive({ session: completeSignUp.createdSessionId });
        return router.push("/");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast({
          title: "Error",
          description: error?.errors[0]?.longMessage,
          variant: "destructive",
        });
      }
      return toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  async function resendCode() {
    if (!isLoaded) return null;
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast({
          title: "Error",
          description: error?.errors[0]?.longMessage,
          variant: "destructive",
        });
      }
      return toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return {
    signUpUser,
    emailVerify,
    isLoaded,
    verifyEmail,
    resendCode,
    isLoading: userMutation.isPending,
  };
}
