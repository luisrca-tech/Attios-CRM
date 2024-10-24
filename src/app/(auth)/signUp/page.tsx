import Image from "next/image";

import { AuthBackground } from "~/feature/auth/AuthBackground";
import { Login } from "~/feature/auth/Login";
import signUpImage from "/public/images/signUpImage.png";

export default function SignUp() {
  return (
    <div className="flex max-h-screen items-center">
      <div className="flex-1">
        <Login />
      </div>
      <AuthBackground>
        <Image src={signUpImage} alt="Closing contract" />
      </AuthBackground>
    </div>
  );
}
