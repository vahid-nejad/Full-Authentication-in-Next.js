"use client";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SignInButton = () => {
  const { data: session } = useSession();
  const pathName = usePathname();
  console.log({ session });

  return (
    <div className="flex items-center ml-auto gap-2">
      {session && session.user ? (
        <>
          <p>
            {session.user.firstName} {session.user.lastName}
          </p>
          <Link href={"/api/auth/signout"}>Sign Out</Link>
        </>
      ) : (
        <>
          <Link
            href={`/auth/signin?callbackUrl=${pathName}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Sign In
          </Link>
          <Link href={"/auth/signup"}>Sign up</Link>
        </>
      )}
    </div>
  );
};

export default SignInButton;
