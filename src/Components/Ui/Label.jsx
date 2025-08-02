import React from "react";

const labelBaseClass =
  "text-sm font-medium leading-none";

const Label = React.forwardRef(({ className = "", ...props }, ref) => {
  const combinedClassName = `${labelBaseClass} ${className}`.trim();

  return <label ref={ref} className={combinedClassName} {...props} />;
});

Label.displayName = "Label";

export { Label };
 