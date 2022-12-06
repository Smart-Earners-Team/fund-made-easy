import React from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { ButtonProps } from "./types";

export default function Button({ className, variant = "primary", loading = false, children, ...props }: ButtonProps) {
  let variantClass = "";

  switch (variant) {
    case "primary":
      variantClass = "btn-primary";
      break;
    default:
      throw new Error("invalid variant type supplied");
  }

  return (
    <button
      className={`btn 
        ${variantClass} ${className}`}
      {...props}
    >
      {loading && <BiLoaderAlt className="animate-spin !w-4 !h-4 inline-block mr-1" />}
      {children}
    </button>
  );
}
