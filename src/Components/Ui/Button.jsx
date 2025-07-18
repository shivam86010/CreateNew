import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

// Basic variant and size maps
const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
  gaming:
    "bg-gradient-primary text-white border border-primary/30 hover:shadow-glow-primary hover:scale-105 transition-all duration-300",
  cyber:
    "bg-gradient-cyber text-white border border-neon-cyan/30 hover:shadow-glow-cyan hover:scale-105 transition-all duration-300",
  unlock:
    "bg-gradient-success text-white border border-cyber-green/30 hover:shadow-glow-primary hover:animate-pulse-glow",
  glitch:
    "bg-primary text-primary-foreground hover:animate-glitch border border-electric-blue/50",
  level:
    "bg-card border-2 border-primary/20 hover:border-primary hover:bg-gradient-primary hover:text-white transition-all duration-500 hover:scale-105",
};

const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
  hero: "h-14 rounded-lg px-12 text-lg font-bold",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const Button = forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const variantClass = variantClasses[variant] || variantClasses.default;
    const sizeClass = sizeClasses[size] || sizeClasses.default;

    return (
      <Comp
        className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
