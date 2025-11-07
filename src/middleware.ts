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

function getAdminUserFromAuthHeader(req: Request): string | null {
  const header = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!header || !header.startsWith("Basic ")) return null;
  try {
    const decoded = Buffer.from(header.replace("Basic ", ""), "base64").toString("utf8");
    const sepIndex = decoded.indexOf(":");
    if (sepIndex === -1) return null;
    const user = decoded.slice(0, sepIndex);
    return user || null;
  } catch {
    return null;
  }
}


const isProtectedRoute = createRouteMatcher([
  // Protect only the course joined route: /course/:slug/joined
  "/course/:slug/joined(.*)",
]);

// Match admin UI and admin APIs for basic auth
const isAdminArea = createRouteMatcher([
  "/admin(.*)",
  "/api/admin(.*)",
  "/admin/notes(.*)",
  "/admin/pdfs"

]);

export default clerkMiddleware(async (auth, req) => {
  // Enforce Clerk user auth for specific protected routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Enforce Basic Auth for admin areas
  if (isAdminArea(req)) {
    const res = checkAdminBasicAuth(req);
    if (res) return res;
    // If authorized, set a readable (non-HTTPOnly) cookie with admin user for UI banner
    const user = getAdminUserFromAuthHeader(req) || "admin";
    const response = NextResponse.next();
    response.cookies.set("admin_user", user, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false,
      // short lifetime, refreshed on each admin request
      maxAge: 60 * 60, // 1 hour
    });
    return response;
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
