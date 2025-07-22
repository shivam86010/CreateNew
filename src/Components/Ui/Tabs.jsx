import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef((props, ref) => {
  const { className = "", ...rest } = props;
  return (
    <TabsPrimitive.List
      ref={ref}
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-200 p-1 text-gray-600 ${className}`}
      {...rest}
    />
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef((props, ref) => {
  const { className = "", ...rest } = props;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 ring-blue-500 ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow ${className}`}
      {...rest}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef((props, ref) => {
  const { className = "", ...rest } = props;

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={`mt-2 focus:outline-none focus:ring-2 ring-blue-500 ring-offset-2 ${className}`}
      {...rest}
    />
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
