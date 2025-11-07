import { cookies } from "next/headers";

export default async function AdminBanner() {
  const cookieStore = await cookies();
  const user = cookieStore.get("admin_user")?.value;
  if (!user) return null;
  return (
    <div className="w-full bg-amber-50 border-b border-amber-200 text-amber-900 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div>
          <strong>Admin mode:</strong> signed in as <span className="font-mono">{user}</span>
        </div>
        <div className="text-xs text-amber-700">
          Access is restricted. Keep your credentials safe.
        </div>
      </div>
    </div>
  );
}
