"use client";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { Button } from "./ui/button";

const SignInButton = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center ml-auto gap-2">
      {session && session.user ? (
        <>
          <p>{session.user.name}</p>
          <Link href={"/api/auth/signout"}>Sign Out</Link>
        </>
      ) : (
        <>
          <Button>Sign In</Button>
          <Link href={"/auth/signup"}>Sign up</Link>
        </>
      )}
    </div>
  );
};

export default SignInButton;
