"use client";

import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "node_modules/@clerk/nextjs/dist/types/client-boundary/hooks";
import { SignUpForm } from "../types/signUpForm.type";
import { useState } from "react";

export function useAuth() {
  const [emailVerify, setEmailVerify] = useState<boolean>(false);
  const { signUp, isLoaded } = useSignUp();

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
        throw new Error(error?.errors[0]?.longMessage);
      }
      throw error;
    }
  }
  return { signUpUser, emailVerify, isLoaded };
}