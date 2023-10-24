"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { forgotPassword } from "@/lib/actions/auth";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email adress."),
});

type InputType = z.infer<typeof FormSchema>;
const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const [submitting, setSubmitting] = useState(false);

  const submit: SubmitHandler<InputType> = async (data) => {
    setSubmitting(true);
    try {
      const result = await forgotPassword(data.email);
      if (result)
        toast({
          title: "Successful",
          description:
            "Reset password link is sent to your email!",
          variant: "success",
        });
      reset();
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Somthing went wrong!",
        variant: "destructive",
      });
      console.error(error);
    }
    setSubmitting(false);
  };
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 justify-center items-center p-2">
      <form onSubmit={handleSubmit(submit)}>
        <Input
          {...register("email")}
          label="Email"
          icon={<EnvelopeIcon />}
          error={errors.email?.message}
        ></Input>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Please Wait</span>
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
      <div className="flex justify-center">
        <Image
          alt="Login"
          src={"/forgotPass.jpg"}
          width={500}
          height={500}
          className="  w-32 md:w-96 col-span-2 "
        />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
