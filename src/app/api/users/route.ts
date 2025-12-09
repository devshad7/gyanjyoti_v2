import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await (await clerkClient()).users.getUser(userId);
  if (user.publicMetadata?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await (await clerkClient()).users.getUserList({ limit: 50 });
  const formatted = users.data
    .filter((u) => u.id !== userId)
    .map((u) => ({
      id: u.id,
      fullName: u.fullName || "Unknown",
      userProfilePicture: u.imageUrl,
      email: u.emailAddresses[0]?.emailAddress,
      role: u.publicMetadata?.role || "user",
    }));

  return NextResponse.json(formatted);
}
