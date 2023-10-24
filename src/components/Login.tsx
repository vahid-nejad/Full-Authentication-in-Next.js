"use client";

import React, { useState } from "react";

import TogglePassword from "./TogglePassword";
import LoginProviderButtons from "./LoginProviderButtons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="p-2 border rounded shadow-md w-96">
      <div className="flex flex-col gap-2">
        <label>User Name</label>
        <Input color="primary" className="mb-5" />

        <label>Password</label>
        <div className="relative">
          <Input
            color="primary"
            className=" w-full"
            type={showPass ? "text" : "password"}
          />
          <TogglePassword
            value={showPass}
            setValue={setShowPass}
            className="absolute top-4 right-2"
          />
        </div>
        <div className="flex items-center justify-center gap-2 border-b-2 p-2 border-gray-300">
          <Button>Sign In</Button>
          <Button variant="outline">Sign Up</Button>
        </div>
        <LoginProviderButtons />
      </div>
    </div>
  );
};

export default Login;
