import React from "react";
import { RiLoader2Fill } from "react-icons/ri";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-auto">
      <div className="w-auto bg-white p-10 flex flex-col items-center justify-center rounded shadow">
        <RiLoader2Fill size={20} className="animate-spin" />
        <p className="animate-pulse text-xs">Please wait...</p>
      </div>
    </div>
  );
}
