import React from "react";
import type { ButtonProps } from "./types";
import cls from "classnames";
import { RiLoader3Line } from "react-icons/ri";

export default function Button({
  className,
  variant = "primary",
  loading = false,
  children,
  ...props
}: ButtonProps) {
  let variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "outline"
      ? "btn-outline"
      : variant === "danger"
      ? "btn-danger"
      : "";

  return (
    <button className={cls("btn", variantClass, className)} {...props}>
      {loading && (
        <RiLoader3Line className="animate-spin !w-4 !h-4 inline-block mr-1" />
      )}
      {children}
    </button>
  );
}
