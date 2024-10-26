import Image from "next/image";

import { LoginForm } from "~/feature/auth/block/LoginForm";
import { AuthBackground } from "~/feature/auth/components/AuthBackground";
import signUpImage from "/public/images/signUpImage.png";

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
