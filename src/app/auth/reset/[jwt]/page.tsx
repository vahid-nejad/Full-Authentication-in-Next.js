import PasswordStrength from "@/components/PasswordStrength";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import TogglePassword from "@/components/TogglePassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { resetPassword } from "@/lib/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  params: { jwt: string };
}
const ResetPasswordPage = async (props: Props) => {
  return <ResetPasswordForm jwtUserId={props.params.jwt} />;
};

export default ResetPasswordPage;
