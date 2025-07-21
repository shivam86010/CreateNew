import React from "react";

const Input = React.forwardRef(({ type = "text", style = {}, ...props }, ref) => {
  const defaultStyle = {
    height: "40px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
    padding: "0 12px",
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  return (
    <input
      type={type}
      ref={ref}
      style={{ ...defaultStyle, ...style }}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
