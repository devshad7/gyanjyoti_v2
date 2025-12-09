"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DeleteUser from "@/components/DeleteUser";
import toast from "react-hot-toast";
import MoveLeft from "@/components/ui/move-left-";

type UserDetails = {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  lastSignIn?: string;
  imageUrl?: string;
};

export default function Page() {
  const { userId } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) {
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        toast.error("Error loading user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, router]);

  const toggleRole = async () => {
    if (!user) return;

    const newRole = user.role === "admin" ? "user" : "admin";

    const res = await fetch("/api/users/update-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, role: newRole }),
    });

    if (res.ok) {
      toast.success(`Role updated to ${newRole}`);
      setUser({ ...user, role: newRole });
    } else {
      toast.error("Failed to update role");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10 mt-14">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col gap-2 mb-6">
          <span
            className="flex items-center cursor-pointer hover:underline text-xs gap-1"
            onClick={() => router.back()}
          >
            <MoveLeft size={18} /> Back to Users
          </span>
          <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-4">
            {user.imageUrl && (
              <img
                src={user.imageUrl}
                alt={user.email}
                className="w-16 h-16 rounded-full border"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-mono text-gray-700">{user.id}</p>
          </div>

          <div className="flex items-center gap-1">
            <p className="text-sm text-gray-500">Role:</p>
            <Badge variant={"secondary"}>{user.role}</Badge>
          </div>

          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="text-gray-800">
              {new Date(user.createdAt || "").toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Last Sign In</p>
            <p className="text-gray-800">
              {new Date(user.createdAt || "").toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              className="bg-[#970747] hover:bg-[#7a053f] cursor-pointer"
              onClick={toggleRole}
            >
              {user.role === "admin" ? "Remove Admin" : "Make Admin"}
            </Button>
            <DeleteUser userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
