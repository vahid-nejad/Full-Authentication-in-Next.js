import Login from "@/components/Login";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SigninPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Login />
      <Link
        className="text-sky-600 hover:text-sky-700 "
        href={"/auth/forgotPassword"}
      >
        Forgot your password?
      </Link>
    </div>
  );
};

export default SigninPage;
