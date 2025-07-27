import React, { forwardRef } from "react";

const Progress = forwardRef(({ className = "", value = 0, ...props }, ref) => {
  const clamped = Math.max(0, Math.min(100, value || 0));

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - clamped}%)` }}
      />
    </div>
  );
});

Progress.displayName = "Progress";

export { Progress };

