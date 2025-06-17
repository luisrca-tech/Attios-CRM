export const getWorkspaceDomain = (subDomain: string) => {
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_VERCEL_URL
  ) {
    const domain = `https://${subDomain}.${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
    return domain;
  }
  const domain = `http://${subDomain}.localhost:3000`;
  console.log("domain", domain);
  return domain;
};

export const getServerWorkspaceDomain = (subDomain: string) => {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL_URL) {
    const domain = `https://${subDomain}.${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    console.log("domain", domain);
    return domain;

  }
  const domain = `http://${subDomain}.localhost:3000/`;
  return domain;
};

export const getWorkspace = (host: string) => {
  const parts = host.split(".");

  // Handle localhost case
  if (parts[0]?.includes("localhost")) {
    return null;
  }

  let minimalLengthForSubdomain = 3;

  const isProd = process.env.VERCEL_URL;

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
