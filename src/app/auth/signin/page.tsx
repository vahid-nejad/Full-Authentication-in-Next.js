import Login from "@/components/Login";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SigninPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Login />
      <Link href={"/auth/forgotPassword"}>
        Forgot your password?
      </Link>
    </div>
  );
};

export default SigninPage;
