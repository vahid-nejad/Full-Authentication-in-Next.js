import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  setValue: (value: boolean) => void;
  value: boolean;
  className?: string;
}

const TogglePassword = ({ setValue, value, className }: Props) => {
  if (value)
    return (
      <EyeSlashIcon
        className={twMerge("w-4 cursor-pointer", className)}
        onClick={() => setValue(false)}
      />
    );
  return (
    <EyeIcon
      className={twMerge("w-4 cursor-pointer", className)}
      onClick={() => setValue(true)}
    />
  );
};

export default TogglePassword;
