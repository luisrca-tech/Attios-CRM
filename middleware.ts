import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export function extractSubdomain(req: NextRequest): string | null {
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0] || "";
  console.log("Extracting subdomain from hostname:", hostname);

  // For localhost, use query parameter
  if (hostname.includes("localhost")) {
    const subdomain = req.nextUrl.searchParams.get("subdomain");
    console.log("Localhost subdomain from query:", subdomain);
    return subdomain;
  }

  // Handle attioscrm.site subdomains
  if (hostname.includes("attioscrm.site")) {
    const parts = hostname.split(".");
    return parts[0] === "www" ? null : (parts[0] ?? null);
  }

  return null;
}

export async function middleware(req: NextRequest) {
  console.error("🔍 Middleware called for URL:", req.url);
  console.error("🔍 Middleware called for host:", req.headers.get("host"));

  const { userId } = await auth();
  console.error("🔍 User ID from auth:", userId);

  if (!userId) {
    console.error("🔍 No user ID, skipping middleware");
    return NextResponse.next();
  }

  const subdomain = extractSubdomain(req);
  console.error("🔍 Extracted subdomain:", subdomain);

  try {
    // Get user's subdomain using tRPC directly
    const userSubdomain = await api.subdomain.getByCurrentUser();
    console.error("🔍 User's subdomain from tRPC:", userSubdomain);

    // If user has a subdomain but isn't on it, redirect them
    if (
      userSubdomain?.subDomain &&
      (!subdomain || subdomain !== userSubdomain.subDomain)
    ) {
      console.error(
        "🔍 Should redirect to subdomain:",
        userSubdomain.subDomain
      );
      const newUrl = new URL(req.url);
      const isLocalhost = req.headers.get("host")?.includes("localhost");

      if (isLocalhost) {
        newUrl.searchParams.set("subdomain", userSubdomain.subDomain);
        newUrl.host = "localhost:3000";
      } else {
        newUrl.host = `${userSubdomain.subDomain}.attioscrm.site`;
      }

      console.error("🔍 Redirecting to:", newUrl.toString());
      return NextResponse.redirect(newUrl);
    }
  } catch (error) {
    console.error("🔍 Error in middleware:", error);
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
