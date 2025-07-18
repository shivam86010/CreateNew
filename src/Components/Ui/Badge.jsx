import React from "react";

const variantClasses = {
  default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border-transparent bg-gray-200 text-black hover:bg-gray-300",
  destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
  outline: "text-black border border-gray-300",
};

const baseClass =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2";

export function Badge({ className = "", variant = "default", ...props }) {
  const combinedClassName = `${baseClass} ${
    variantClasses[variant] || ""
  } ${className}`;
  return <div className={combinedClassName} {...props} />;
}
