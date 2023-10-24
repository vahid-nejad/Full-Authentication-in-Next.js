import * as React from "react";

import { cn } from "@/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactElement;
  error?: string;
  children?: React.ReactNode;
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    { label, icon, className, error, children, ...props },
    ref
  ) => {
    return (
      <div
        className={cn("relative flex flex-col", className)}
      >
        {!!label && (
          <label
            className={cn({ "text-red-500": !!error })}
          >
            {label}
          </label>
        )}
        <input
          {...props}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            { "border-red-500": error, "pl-6": !!icon }
          )}
        />
        {!!icon && (
          <span
            className={cn(
              "absolute top-9 left-1 w-4 text-slate-600",
              {
                "text-red-500": !!error,
              }
            )}
          >
            {icon}
          </span>
        )}
        {children}
        {!!error && (
          <>
            <ExclamationCircleIcon className="w-4 absolute text-red-500 right-2 top-9  " />
            <p className="text-red-500 text-sm mt-1 ml-3">
              {error}
            </p>
          </>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
