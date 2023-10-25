"use client";

import React, { useState } from "react";

import TogglePassword from "./TogglePassword";
import LoginProviderButtons from "./LoginProviderButtons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email adress."),

  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

interface Props {
  callbackUrl?: string;
}
const Login = ({ callbackUrl }: Props) => {
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<InputType> = async (
    data
  ) => {
    setSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    console.log({ result });
    setSubmitting(false);
    if (!result?.ok) {
      toast({
        title: "Oops!",
        description: result?.error,
        variant: "destructive",
      });
      return;
    }
    router.push(callbackUrl ? callbackUrl : "/");
  };
  return (
    <div className="p-2 border rounded shadow-md w-96">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <Input
          {...register("email")}
          label="User name"
          className="mb-5"
          error={errors.email?.message}
        />
        <Input
          {...register("password")}
          label="Password"
          error={errors.password?.message}
          type={showPass ? "text" : "password"}
        >
          <TogglePassword
            className="absolute right-6 top-9"
            setValue={setShowPass}
            value={showPass}
          />
        </Input>
        <div className="flex items-center justify-center gap-2 border-b-2 p-2 border-gray-300">
          <Button
            type="submit"
            className="w-36"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span>Please Wait</span>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              <>
                <span className="mr-2">Sign In</span>
                <LogIn />
              </>
            )}
          </Button>
          <Link
            className="w-36 border border-blue-500 text-center py-2 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
            href={"/auth/signup"}
          >
            Sign up
          </Link>
        </div>
      </form>
      <LoginProviderButtons />
    </div>
  );
};

export default Login;
