"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const { signIn, isLoaded, setActive } = useSignIn();

  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stage, setStage] = useState<"request" | "reset">("request");

  if (!isLoaded) return null;

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier,
      });
      setStage("reset");
    } catch (err: any) {
      setError(err?.errors?.[0]?.longMessage ?? String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      if (result?.status === "needs_second_factor") {
        setError("2FA required — not handled in this UI.");
        return;
      }
      if (result?.status === "complete") {
        toast.success("Password reset successful.");
      } else {
        console.log("Unhandled reset result", result);
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.longMessage ?? String(err));
    } finally {
      setIsLoading(false);
      setCode("");
      setPassword("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer text-blue-500 text-sm hover:underline">
          Forgot Password?
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle> Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email to receive the reset link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          {stage === "request" && (
            <div className="grid flex-1 gap-2">
              <Label htmlFor="userEmail" className="sr-only">
                Link
              </Label>
              <Input
                name="userEmail"
                type="email"
                placeholder="Enter your email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              {error && <p className="text-destructive text-sm">{error}</p>}
            </div>
          )}

          {stage === "reset" && (
            <div className="grid flex-1 gap-2">
              <Label htmlFor="resetCode" className="sr-only">
                Reset Code
              </Label>
              <Input
                name="resetCode"
                type="text"
                placeholder="Enter the reset code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Label htmlFor="newPassword" className="sr-only">
                Enter new password
              </Label>
              <Input
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-destructive text-sm">{error}</p>}
            </div>
          )}
        </div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
            >
              Close
            </Button>
          </DialogClose>
          {stage === "request" && (
            <Button
              type="button"
              disabled={!identifier}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={handleRequestCode}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Reset"}
            </Button>
          )}
          {stage === "reset" && (
            <Button
              type="button"
              disabled={!password || !code}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={handleReset}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
