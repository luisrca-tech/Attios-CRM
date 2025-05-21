import { SignInForm } from "~/features/auth/components/block/SignInForm";
import { SubdomainSignInForm } from "~/features/auth/components/block/SubdomainSignInForm";
import { AuthBackground } from "~/features/auth/components/ui/AuthBackground";
import signInImage from "/public/images/signInImage.png";
import { headers } from "next/headers";

export default function SignIn() {
  const headersList = headers();
  const host = headersList.get("host") ?? "";
  const subdomain = host.split(".")[0];
  const isLocalhost = host.includes("localhost");
  const displaySubdomain =
    isLocalhost && subdomain !== "localhost" ? subdomain : null;

  const isSubdomainSignIn = !!displaySubdomain;

  return (
    <main className="flex max-h-screen items-center overflow-hidden">
      <div className="flex-1">
        {isSubdomainSignIn ? (
          <SubdomainSignInForm subdomain={displaySubdomain} />
        ) : (
          <SignInForm />
        )}
      </div>
      <AuthBackground image={signInImage.src} />
    </main>
  );
}
