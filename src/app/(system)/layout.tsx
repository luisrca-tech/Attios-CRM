import "~/styles/globals.css";

import type { Metadata } from "next";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BottomMenu } from "~/common/components/ui/BottomMenuNavigation";
import { SideMenu } from "~/common/components/ui/SideMenuNavigation";
import { api } from "~/trpc/server";

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
    redirect("/sign-in");
  }

  const user = await api.user.getUserById(userId);
  if (!user) {
    redirect("/sign-in");
  }

  if (!user.subDomains) {
    redirect("/teams/create");
  }

  return (
    <div className="h-screen">
      <div className="flex w-full">
        <SideMenu />
        {children}
      </div>
      <BottomMenu />
    </div>
  );
}
