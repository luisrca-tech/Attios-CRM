import Image from "next/image";

import { AuthBackground } from "~/feature/auth/components/AuthBackground";
import signUpImage from "/public/images/signUpImage.png";
import { LoginForm } from "~/feature/auth/LoginForm";

export default function SignUp() {
  return (
    <main className="flex max-h-screen items-center">
      <div className="flex-1">
        <LoginForm />
      </div>
      <AuthBackground>
        <Image src={signUpImage} alt="Closing contract" />
      </AuthBackground>
    </main>
  );
}
