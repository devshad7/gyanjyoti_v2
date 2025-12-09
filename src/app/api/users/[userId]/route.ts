import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const params = await context.params;
    const { userId: adminId } = await auth();

    if (!adminId) return NextResponse.redirect(new URL("/404", req.url));

    const admin = await (await clerkClient()).users.getUser(adminId);
    if (admin.publicMetadata?.role !== "admin")
      return NextResponse.redirect(new URL("/404", req.url));

    const user = await (await clerkClient()).users.getUser(params.userId);
    if (!user) return NextResponse.redirect(new URL("/404", req.url));

    const data = {
      id: user.id,
      email: user.emailAddresses?.[0]?.emailAddress,
      role: user.publicMetadata?.role || "user",
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      lastSignIn: user.lastSignInAt,
      imageUrl: user.imageUrl,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE - delete a user
export async function DELETE(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const params = await context.params;
    const { userId: adminId } = await auth();

    if (!adminId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = await (await clerkClient()).users.getUser(adminId);
    if (admin.publicMetadata?.role !== "admin")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // Prevent admin(current) from deleting themselves
    if (params.userId === adminId) {
      return NextResponse.json(
        { error: "You cannot delete your own account." },
        { status: 400 }
      );
    }

    await (await clerkClient()).users.deleteUser(params.userId);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user." },
      { status: 500 }
    );
  }
}
