export const getWorkspaceDomain = (subDomain: string) => {
  if (process.env.NODE_ENV === "production") {
    const domain = `https://${subDomain}.${process.env.VERCEL_URL}`;
    return domain;
  }
  const domain = `http://${subDomain}.localhost:3000`;
  return domain;
};

export const getWorkspace = (host: string) => {
  const parts = host.split(".");

  if (parts.length > 1 && parts[0] && parts[0] !== "localhost") {
    const subdomain = parts[0];
    try {
      return getWorkspaceDomain(subdomain);
    } catch (error) {
      console.error("[Debug] Error generating domain:", error);
      return null;
    }
  }
  return null;
};
