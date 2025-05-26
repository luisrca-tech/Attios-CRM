import "~/styles/globals.css";

import type { Metadata } from "next";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { getSubdomain } from "~/utils/subdomain";

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

  if (userId) {
    const user = await api.user.getUserById(userId);

    if (!user) {
      redirect("/sign-in");
    }

      if (user?.subDomains?.subDomain) {
      redirect(`${getSubdomain(user.subDomains.subDomain)}/subdomain-sign-in`);
    }

    redirect("/");
  }

  return <>{children}</>;
}
