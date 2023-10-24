"use client";
import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import TogglePassword from "./TogglePassword";
import { useEffect, useState } from "react";
import { registerUser } from "@/lib/actions/auth";
import { User } from "@prisma/client";
import { toast } from "./ui/use-toast";
import { passwordStrength } from "check-password-strength";
import clsx from "clsx";
import PasswordStrength from "./PasswordStrength";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First name must be atleast 2 characters",
      })
      .max(32, {
        message:
          "First name must be less than 32 characters",
      })
      .regex(new RegExp("^[a-zA-z]+$"), {
        message: "No special characters allowed.",
      }),
    lastName: z
      .string()
      .min(2, "Last name must be atleast 2 characters")
      .max(32, "Last name must be less than 32 characters")
      .regex(
        new RegExp("^[a-zA-z]+$"),
        "No special characters allowed."
      ),
    email: z
      .string()
      .email("Please enter a valid email adress."),
    phone: z
      .string()
      .regex(
        new RegExp("^[0-9]{5}$"),
        "No special characters allowed."
      ),

    password: z
      .string()
      .min(6, "Password must be atleast 6 characters.")
      .max(52, "Password must be less than 52 characters."),
    confirmPassword: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({
        message:
          "Please agree to all the terms and conditions before continuing.",
      }),
    }),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Password doesn't match",
      path: ["confirmPassword"],
    }
  );

type InputType = z.infer<typeof FormSchema>;

interface Props {}
const Signup = (props: Props) => {
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
    const { confirmPassword, accept, ...user } = data;

    try {
      const result = await registerUser(user as User);
      if (result)
        toast({
          title: "Successful",
          description: "User resgistered successfully!",
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
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2  gap-3 p-2 shadow border rounded-md"
    >
      <Input
        {...register("firstName")}
        label="First Name"
        icon={<UserIcon />}
        error={errors?.firstName?.message}
      />
      <Input
        {...register("lastName")}
        label="Last Name"
        icon={<UserIcon />}
        error={errors.lastName?.message}
      />
      <Input
        {...register("email")}
        className="col-span-2 "
        label="Email"
        icon={<EnvelopeIcon />}
        error={errors.email?.message}
      />
      <Input
        {...register("phone")}
        className="col-span-2 "
        label="Phone Number"
        icon={<PhoneIcon />}
        error={errors.phone?.message}
      />
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

      <div className="flex items-center mt-3 col-span-2">
        <input
          type="checkbox"
          id="accept"
          className="mr-2 focus:ring-0 rounded"
          {...register("accept")}
        />
        <label htmlFor="accept" className="text-gray-700">
          I accept the&nbsp;{" "}
          <a
            href=""
            className="text-blue-600 hover:text-blue-700 hover:underline"
            target="_blank"
          >
            terms
          </a>
          &nbsp;and&nbsp;
          <a
            href=""
            className="text-blue-600 hover:text-blue-700 hover:underline"
            target="_blank"
          >
            privacy policy
          </a>
        </label>
      </div>
      <div>
        {errors?.accept && (
          <p className="text-sm text-red-600 mt-1">
            {errors?.accept?.message}
          </p>
        )}
      </div>

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

export default Signup;
