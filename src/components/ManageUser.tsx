"use client";

import { Loader2, UserPlus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "@/types/UsersInterfaceProps";

const ManageUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(searchUser.toLowerCase()) ||
      (user.email &&
        user.email.toLowerCase().includes(searchUser.toLowerCase()))
  );
  return (
    <section
      className={`bg-white rounded-2xl shadow-xl border border-gray-100 max-w-7xl m-5 mx-auto py-4 px-6`}
    >
      <div className="flex items-center gap-3 mb-6 border-b pb-4 border-gray-100">
        <UserPlus className="text-2xl text-[#970747]" />
        <h2 className="text-xl font-bold text-gray-800">Manage Users</h2>
        {users.length > 0 && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full text-white bg-[#970747]">
            {users.length} User
          </span>
        )}
      </div>

      <form className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="email"
          placeholder="Search..."
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
          }}
          className="flex-1 px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#970747] focus:ring-opacity-70 focus:border-transparent transition-colors"
        />
      </form>

      {loading ? (
        <div className="p-8 bg-white rounded-2xl shadow-lg text-center flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 max-h-auto overflow-y-auto pr-2">
          {filteredUsers.length === 0 ? (
            <div className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-sm border border-dashed border-gray-200">
              No users found.
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="">
                    <Image
                      src={user.userProfilePicture || "/default-profile.png"}
                      alt={user.fullName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-sm">
                    <h2 className="text-base">
                      {user.fullName}{" "}
                      <Badge variant={"outline"}>{user.role}</Badge>
                    </h2>
                    <span>{user.email}</span>
                  </div>
                </div>
                <Link href={`/admin/users/${user.id}`}>
                  <Button className="cursor-pointer bg-[#970747] hover:bg-[#7a053f]">
                    Manage
                  </Button>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default ManageUser;
