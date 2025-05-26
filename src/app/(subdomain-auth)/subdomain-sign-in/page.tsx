import { SubdomainSignInForm } from "~/features/auth/components/block/SubdomainSignInForm";
import { AuthBackground } from "~/features/auth/components/ui/AuthBackground";
import signInImage from "/public/images/signInImage.png";
import { headers } from "next/headers";
import { getDisplaySubdomain } from "~/utils/subdomain";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { getSubdomain } from "~/utils/subdomain";

export default async function SubdomainSignIn() {
  const headersList = headers();
  const host = headersList.get("host") ?? "";
  const displaySubdomain = getDisplaySubdomain(host);

  const subdomain = await api.subdomain.getBySubdomain({
    subDomain: displaySubdomain ?? "",
  });

  if (subdomain?.subDomain !== displaySubdomain) {
    redirect(`${getSubdomain(displaySubdomain ?? "")}/unauthorized-subdomain`);
  }
  return (
    <main className="flex max-h-screen items-center overflow-hidden">
      <div className="flex-1">
        <SubdomainSignInForm subdomain={displaySubdomain ?? ""} />
      </div>
      <AuthBackground image={signInImage.src} />
    </main>
  );
}
