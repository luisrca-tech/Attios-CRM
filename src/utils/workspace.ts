export const getWorkspaceDomain = (subDomain: string) => {
  if (process.env.NODE_ENV === "production") {
    return `https://${subDomain}.${process.env.VERCEL_URL}`;
  }
  return `http://${subDomain}.localhost:3000`;
};

export const getWorkspace = (host: string) => {
  const parts = host.split(".");

  if (parts.length > 1 && parts[0] && parts[0] !== "localhost") {
    const subdomain = parts[0];
    try {
      getWorkspaceDomain(subdomain);
      return subdomain;
    } catch {
      return null;
    }
  }
};
