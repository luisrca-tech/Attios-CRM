import "~/styles/globals.css";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { api } from "~/trpc/server";
import { getWorkspace } from "~/utils/workspace";

export const metadata: Metadata = {
  title: "Attios",
  description:
    "Attios CRM: Sell products and services, manage your leads, and allow them to search for offerings with ease.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { userId } = await auth();

  if (userId) {
    const user = await api.user.getUserById(userId);
    if (user?.workspaces) {
      const domain = getWorkspace(user.workspaces.workspace);
      if (domain) {
        redirect(domain);
      }
    }
    redirect("/");
  }

  return <>{children}</>;
}
