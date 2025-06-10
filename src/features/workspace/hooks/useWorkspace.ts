"use client";

import { useState, useEffect } from "react";

export function useWorkspace() {
  const [workspace, setWorkspace] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.hostname;
      const splitUrl = url.split(".");
      const hasSubdomain = splitUrl.length >= 2 && splitUrl[0] !== "www";
      setWorkspace(hasSubdomain && splitUrl[0] ? splitUrl[0] : null);
    }
  }, []);

  return { workspace };
}
