import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Basic Auth for admin areas (single user/pass via env)
function checkAdminBasicAuth(req: Request): NextResponse | null {
  try {
    const adminUser = process.env.ADMIN_USER || "";
    const adminPass = process.env.ADMIN_PASS || "";

    // If not configured, deny by default to avoid accidental exposure
    if (!adminUser || !adminPass) {
      return new NextResponse("Admin credentials not configured", { status: 503 });
    }

    const header = req.headers.get("authorization") || req.headers.get("Authorization");
    if (!header || !header.startsWith("Basic ")) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
      });
    }

    const base64Credentials = header.replace("Basic ", "").trim();
    let decoded = "";
    try {
      decoded = Buffer.from(base64Credentials, "base64").toString("utf8");
    } catch {
      return new NextResponse("Invalid auth header", { status: 400 });
    }
    const sepIndex = decoded.indexOf(":");
    if (sepIndex === -1) {
      return new NextResponse("Invalid auth format", { status: 400 });
    }
    const user = decoded.slice(0, sepIndex);
    const pass = decoded.slice(sepIndex + 1);

    if (user !== adminUser || pass !== adminPass) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
      });
    }
    return null; // ok
  } catch {
    return new NextResponse("Auth error", { status: 500 });
  }
}

const isProtectedRoute = createRouteMatcher([
  // Protect only the course joined route: /course/:slug/joined
  "/course/:slug/joined(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Enforce Clerk user auth for specific protected routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // NOTE: Admin area Basic Auth has been removed intentionally to make admin UI and
  // related APIs publicly accessible. If you need to re-enable protection later,
  // restore the Basic Auth checks or add a feature-flagged env var.
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
