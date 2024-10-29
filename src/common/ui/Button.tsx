import Link from "next/link";
import { type ComponentProps, forwardRef } from "react";
import { cn } from "~/lib/utils";
import { Spinner } from "./Spinner";

type CommonProps = {
  variant?: "filled" | "outlined";
  color?: "primary" | "secondary" | "tertiary" | "quaternary" | "quinternary" | "senary";
};

const variants = ({ variant = "filled", color = "primary" }: CommonProps) =>
  cn(
    "flex items-center justify-center gap-[0.625rem] rounded-lg px-[1.875rem] py-[0.9375rem] font-bold text-sm leading-1 disabled:bg-white-200 disabled:text-primary-200 disabled:hover:cursor-not-allowed disabled:hover:line-through",
    {
      "bg-primary-100/80 text-white-100 hover:bg-primary-100":
        variant === "filled" && color === "primary",
      "bg-primary-100/10 text-primary-100 hover:bg-primary-100 hover:text-white-100":
        variant === "filled" && color === "secondary",
      "bg-secondary-200 text-white-100 hover:bg-secondary-200/70":
        variant === "filled" && color === "tertiary",
      "bg-secondary-300 text-white-100 hover:bg-secondary-300/70":
        variant === "filled" && color === "quaternary",
      "bg-secondary-100 text-white-100 hover:bg-secondary-100/70":
        variant === "filled" && color === "quinternary",
      "bg-secondary-400 text-white-100 hover:bg-secondary-400/70":
        variant === "filled" && color === "senary",
    },
    {
      "border bg-transparent": variant === "outlined",
      "border-primary-100 text-primary-100 hover:bg-primary-100/70 hover:text-white-100":
        variant === "outlined" && color === "primary",
      "border-secondary-[#ECECF2] text-primary-200 hover:bg-primary-200/70 hover:text-white-100":
        variant === "outlined" && color === "secondary",
      "border-secondary-200 text-secondary-200 hover:bg-secondary-200/70 hover:text-white-100":
        variant === "outlined" && color === "tertiary",
      "border-secondary-300 text-secondary-300 hover:bg-secondary-300/70 hover:text-white-100":
        variant === "outlined" && color === "quaternary",
      "border-secondary-100 text-secondary-100 hover:bg-secondary-100/70 hover:text-white-100":
        variant === "outlined" && color === "quinternary",
      "border-secondary-400 text-secondary-400 hover:bg-secondary-400/70 hover:text-white-100":
        variant === "outlined" && color === "senary",
    }
  );

type LinkProps = CommonProps & React.ComponentProps<typeof Link>;

const LinkButton = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { className, variant = "filled", color = "primary", children, ...rest },
    ref
  ) => {
    return (
      <Link
        {...rest}
        ref={ref}
        className={cn(variants({ variant, color }), className)}
      >
        {children}
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";

type ButtonProps = CommonProps & ComponentProps<"button"> & {
  isLoading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, isLoading, ...rest }, ref) => {
    return (
      <button {...rest} ref={ref} className={cn(variants(rest), className)}>
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, LinkButton };
