import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeleteUserProps {
  userId: string;
}

const DeleteUser = ({ userId }: DeleteUserProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("User deleted successfully");
        router.push("/admin/users");
      } else {
        console.error(data.error);
        toast.error("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-[#970747] hover:bg-[#7a053f] cursor-pointer">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and remove their data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#970747] hover:bg-[#7a053f] cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUser;
