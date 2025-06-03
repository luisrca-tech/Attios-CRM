import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { lato } from "~/assets/fonts/lato";
import { TRPCReactProvider } from "~/trpc/react";
import { Provider as JotaiProvider } from "jotai";

import { WorkspaceProvider } from "~/common/providers/WorkspaceProvider";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="pt-BR"
        className={`${lato.className}`}
      >
        <body>
          <JotaiProvider>
            <WorkspaceProvider>
              <NuqsAdapter>
                <TRPCReactProvider>
                  {children}
                  <Toaster richColors />
                </TRPCReactProvider>
              </NuqsAdapter>
            </WorkspaceProvider>
          </JotaiProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
