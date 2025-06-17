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

  // Handle localhost case
  if (parts[0]?.includes("localhost")) {
    return null;
  }

  let minimalLengthForSubdomain = 3;

  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    minimalLengthForSubdomain = 2;
  }

  const hasSubdomain =
    parts.length >= minimalLengthForSubdomain && parts[0] !== "www";
  if (hasSubdomain) {
    return parts[0];
  }
  return null;
};
