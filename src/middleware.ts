import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isCourseJoinedRoute = createRouteMatcher(["/course/:slug/joined(.*)"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isCourseJoinedRoute(req)) {
    await auth.protect();
  }

  if (isAdminRoute(req)) {
    if (!userId) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    const user = await clerkClient();
    const clerkUser = await user.users.getUser(userId);
    const publicMetadata = clerkUser.publicMetadata?.role;

    if (publicMetadata !== "admin") {
      return NextResponse.rewrite(new URL("/404", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
