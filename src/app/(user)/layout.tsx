import "~/styles/globals.css";

import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { lato } from "~/assets/fonts/lato";
import { Toaster } from "~/common/components/ui/sonner";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Attios",
  description:
    "Attios CRM: Sell products and services, manage your leads, and allow them to search for offerings with ease.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/signUp");
  }

  return (
    <ClerkProvider>
      <html lang="en" className={`${lato.className}`}>
        <body>
          <Toaster richColors />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
