import AdminBanner from "@/components/admin-banner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Small banner with admin username */}
      <AdminBanner />
      {children}
    </div>
  );
}
