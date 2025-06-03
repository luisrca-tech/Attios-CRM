"use client";

import { useAtom } from "jotai";
import { useWorkspace } from "~/features/workspace/hooks/useWorkspace";
import { workspaceAtom } from "../atoms/current-workspace";
import { useEffect } from "react";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { workspace } = useWorkspace();
  const [, setWorkspace] = useAtom(workspaceAtom);

  useEffect(() => {
    if (workspace) {
      setWorkspace(workspace);
    }
  }, [workspace, setWorkspace]);

  return <>{children}</>;
}
