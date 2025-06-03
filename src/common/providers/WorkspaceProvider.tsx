"use client";

import { useAtom } from "jotai";
import { useSubdomain } from "~/features/subdomain/hooks/useSubdomain";
import { workspaceAtom } from "../atoms/current-workspace";
import { useEffect } from "react";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { subdomain } = useSubdomain();
  const [, setWorkspace] = useAtom(workspaceAtom);

  useEffect(() => {
    if (subdomain) {
      setWorkspace(subdomain);
    }
  }, [subdomain, setWorkspace]);

  return <>{children}</>;
}
