import Link from "next/link";
import SignInButton from "./SignInButton";

const AppBar = () => {
  return (
    <header className="bg-gradient-to-b from-white to-slate-100 text-slate-500 flex items-center p-2">
      <Link href={"/"}>Home</Link>
      <SignInButton />
    </header>
  );
};

export default AppBar;
