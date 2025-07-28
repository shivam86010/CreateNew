import React, { useState } from "react";
import { X } from "lucide-react";

export const Dialog = ({ children, open, onOpenChange }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/80" onClick={() => onOpenChange(false)} />
          {children}
        </div>
      )}
    </>
  );
};

export const DialogTrigger = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

export const DialogContent = ({ children, className = "", onClose }) => {
  return (
    <div
      className={`z-50 w-full max-w-lg bg-white border p-6 shadow-lg sm:rounded-lg relative ${className}`}
    >
      {children}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
};

export const DialogHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
    {children}
  </div>
);

export const DialogFooter = ({ children, className = "" }) => (
  <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}>
    {children}
  </div>
);

export const DialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h2>
);

export const DialogDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);

export const DialogClose = ({ children, onClick }) => (
  <button onClick={onClick}>
    {children}
  </button>
);
