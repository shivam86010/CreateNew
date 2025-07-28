import React from "react";
import { Search } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";

// === Custom Dialog ===
export const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80" onClick={onClose} />
      <div className="z-50 w-full max-w-lg bg-white rounded-md shadow-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className = "" }) => (
  <div className={`p-0 ${className}`}>{children}</div>
);

// === Command Component Wrappers using cmdk ===
export const Command = React.forwardRef(({ className = "", ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={`flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-black ${className}`}
    {...props}
  />
));
Command.displayName = "Command";

export const CommandDialog = ({ open, onClose, children }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogContent>
      <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
);

export const CommandInput = React.forwardRef(({ className = "", ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={`flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

export const CommandList = React.forwardRef(({ className = "", ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={`max-h-[300px] overflow-y-auto overflow-x-hidden ${className}`}
    {...props}
  />
));
CommandList.displayName = "CommandList";

export const CommandEmpty = React.forwardRef((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm text-gray-500"
    {...props}
  />
));
CommandEmpty.displayName = "CommandEmpty";

export const CommandGroup = React.forwardRef(({ className = "", ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={`overflow-hidden p-1 text-black [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500 ${className}`}
    {...props}
  />
));
CommandGroup.displayName = "CommandGroup";

export const CommandSeparator = React.forwardRef(({ className = "", ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={`-mx-1 h-px bg-gray-200 ${className}`}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";

export const CommandItem = React.forwardRef(({ className = "", ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none
      data-[disabled=true]:pointer-events-none 
      data-[disabled=true]:opacity-50
      data-[selected=true]:bg-gray-100 
      data-[selected=true]:text-black
      hover:bg-gray-100
      ${className}`}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";

export const CommandShortcut = ({ className = "", ...props }) => (
  <span className={`ml-auto text-xs tracking-widest text-gray-400 ${className}`} {...props} />
);
CommandShortcut.displayName = "CommandShortcut";
