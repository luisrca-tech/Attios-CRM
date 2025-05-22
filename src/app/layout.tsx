import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { lato } from "~/assets/fonts/lato";
import { TRPCReactProvider } from "~/trpc/react";
import { Provider as JotaiProvider } from "jotai";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { api } from "~/trpc/server";
import { getDisplaySubdomain, getSubdomain } from "~/utils/subdomain";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = headers();
  const host = headersList.get("host") ?? "";
  const displaySubdomain = getDisplaySubdomain(host);

  const { userId } = await auth();

  if (userId) {
    const user = await api.user.getUserById(userId);

    if (user?.subDomains?.subDomain) {
      if (user.subDomains.subDomain !== displaySubdomain) {
        redirect(getSubdomain(user.subDomains.subDomain));
      }
    }
  }

  return (
    <ClerkProvider>
      <html
        lang="pt-BR"
        className={`${lato.className}`}
      >
        <body>
          <JotaiProvider>
            <NuqsAdapter>
              <TRPCReactProvider>
                {children}
                <Toaster richColors />
              </TRPCReactProvider>
            </NuqsAdapter>
          </JotaiProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
