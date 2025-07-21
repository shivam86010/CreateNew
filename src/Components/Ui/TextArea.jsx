import React from "react";

const Textarea = React.forwardRef(({ style = {}, ...props }, ref) => {
  const defaultStyle = {
    minHeight: "80px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
    padding: "8px 12px",
    fontSize: "14px",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    color: "#000",
  };

  return (
    <textarea
      ref={ref}
      style={{ ...defaultStyle, ...style }}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
