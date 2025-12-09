import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId, role } = await req.json();

    const { userId: authUserId } = await auth();
    if (!authUserId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await (await clerkClient()).users.getUser(authUserId);
    if (user.publicMetadata?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!userId || !role) {
      return NextResponse.json(
        { error: "Missing userId or role" },
        { status: 400 }
      );
    }

    await (
      await clerkClient()
    ).users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating role:", err);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
}