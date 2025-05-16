import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function extractSubdomain(req: NextRequest): string | null {
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0];

  if (!hostname) return null;

  // Handle both localhost and production domains
  if (hostname.includes("localhost")) {
    const parts = hostname.split(".");
    return parts[0] === "localhost" ? null : (parts[0] ?? null);
  }

  // Handle attioscrm.site subdomains
  if (hostname.includes("attioscrm.site")) {
    const parts = hostname.split(".");
    return parts[0] === "www" ? null : (parts[0] ?? null);
  }

  return null;
}

export async function middleware(req: NextRequest) {
  console.log("Middleware called for URL:", req.url);
  console.log("Middleware called for host:", req.headers.get("host"));

  const { userId } = await auth();
  console.log("User ID from auth:", userId);

  if (!userId) {
    return NextResponse.next();
  }

  const subdomain = extractSubdomain(req);
  console.log("Current subdomain:", subdomain);

  // Get user data from your API
  const response = await fetch(
    `${req.nextUrl.origin}/api/trpc/user.getUserById?input=${userId}`
  );
  const userData = await response.json();
  console.log("User data:", userData);

  const userSubdomain = userData?.result?.data?.subDomains?.subDomain;
  console.log("User's subdomain:", userSubdomain);

  // If user has a subdomain but isn't on it, redirect them
  if (userSubdomain && (!subdomain || subdomain !== userSubdomain)) {
    console.log("Redirecting to user's subdomain:", userSubdomain);
    const newUrl = new URL(req.url);
    const isLocalhost = req.headers.get("host")?.includes("localhost");
    console.log("Is localhost:", isLocalhost);
    newUrl.host = isLocalhost
      ? `${userSubdomain}.localhost:3000`
      : `${userSubdomain}.attioscrm.site`;
    console.log("Redirecting to:", newUrl.toString());
    return NextResponse.redirect(newUrl);
  }

  // If user is on a subdomain that isn't theirs, redirect to root
  if (subdomain && userSubdomain && subdomain !== userSubdomain) {
    console.log("Redirecting to root - subdomain doesn't belong to user");
    const newUrl = new URL(req.url);
    const isLocalhost = req.headers.get("host")?.includes("localhost");
    console.log("Is localhost:", isLocalhost);
    newUrl.host = isLocalhost ? "localhost:3000" : "attioscrm.site";
    console.log("Redirecting to:", newUrl.toString());
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
