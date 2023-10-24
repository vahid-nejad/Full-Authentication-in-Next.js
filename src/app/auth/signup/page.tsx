import Signup from "@/components/Signup";
import Image from "next/image";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 justify-center items-center">
      <div className="md:col-span-2">
        <p className="text-center p-2">
          Already Signed up?
          <Link
            className="transition-colors text-sky-500 hover:text-sky-700"
            href={"/auth/signin"}
          >
            Sign In
          </Link>
        </p>
      </div>
      <Signup />

      <div className="flex justify-center">
        <Image
          alt="Login"
          src={"/login.png"}
          width={500}
          height={500}
          className="  w-32 md:w-96  "
        />
      </div>
    </div>
  );
};

export default SignupPage;
