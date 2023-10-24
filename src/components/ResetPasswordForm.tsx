"use client";

import { resetPassword } from "@/lib/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";
import TogglePassword from "./TogglePassword";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters.")
      .max(52, "Password must be less than 52 characters."),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Password doesn't match",
      path: ["confirmPassword"],
    }
  );
type InputType = z.infer<typeof FormSchema>;

interface Props {
  jwtUserId: string;
}
const ResetPasswordForm = (props: Props) => {
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [passStrength, setPassStrength] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    setPassStrength(
      passwordStrength(
        watch().password ? watch().password : ""
      ).id
    );
  }, [watch().password]);

  const onSubmit: SubmitHandler<InputType> = async (
    data
  ) => {
    setSubmitting(true);

    try {
      const result = await resetPassword(
        props.jwtUserId,
        data.password
      );
      if (result)
        toast({
          title: "Successful",
          description:
            "Your Password Has Been Rest successfully!",
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
    <form
      className="flex flex-col gap-3 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("password")}
        label="Password"
        error={errors.password?.message}
        type={showPass ? "text" : "password"}
        className="col-span-2"
      >
        <TogglePassword
          className="absolute right-6 top-9"
          setValue={setShowPass}
          value={showPass}
        />
      </Input>

      <PasswordStrength passStrength={passStrength} />

      <Input
        {...register("confirmPassword")}
        label="Confirm Password"
        error={errors.confirmPassword?.message}
        type={showPass ? "text" : "password"}
        className="col-span-2"
      />

      <div className="flex justify-center items-center col-span-2 ">
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
      </div>
    </form>
  );
};

export default ResetPasswordForm;
