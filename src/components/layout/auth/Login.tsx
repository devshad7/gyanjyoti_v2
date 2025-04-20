import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const Login = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="">
          <div className="">
            <div className="">
              <h1>Welcome Back</h1>
              <span>Please login your account</span>
            </div>
            <div className="">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="Email" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Password</Label>
                <Input type="password" placeholder="Password" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
