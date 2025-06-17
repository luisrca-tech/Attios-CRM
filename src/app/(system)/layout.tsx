import "~/styles/globals.css";

import type { Metadata } from "next";

import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BottomMenu } from "~/common/components/ui/BottomMenuNavigation";
import { SideMenu } from "~/common/components/ui/SideMenuNavigation";
import { api } from "~/trpc/server";
import { getWorkspace, getServerWorkspaceDomain } from "~/utils/workspace";

export const metadata: Metadata = {
  title: "Attios",
  description:
    "Attios CRM: Sell products and services, manage your leads, and allow them to search for offerings with ease.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = headers();
  const host = headersList.get("host") ?? "";
  const workspace = getWorkspace(host);

  const { userId } = await auth();

  if (!userId && !workspace) {
    redirect("/sign-up");
  }

  if (!userId && workspace) {
    redirect("/sign-in");
  }

  const user = await api.user.getUserById(userId as string);

  if (!user?.workspaces) {
    redirect("/teams/create");
  }

  if (user.workspaces.workspace !== workspace) {
    const domain = getServerWorkspaceDomain(user.workspaces.workspace);
    redirect(domain);
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
