// // components/Collapsible.js
// import React, { useState } from 'react'



// function Collapsible({ children, open: defaultOpen = false }) {
//   const [isOpen, setIsOpen] = useState(defaultOpen);

//   // Clone children and inject props
//   const updatedChildren = React.Children.map(children, (child) => {
//     if (!React.isValidElement(child)) return child;

//     if (child.type.displayName === "CollapsibleTrigger") {
//       return React.cloneElement(child, { onClick: () => setIsOpen(!isOpen), isOpen });
//     }

//     if (child.type.displayName === "CollapsibleContent") {
//       return React.cloneElement(child, { isOpen });
//     }

//     return child;
//   });

//   return <div>{updatedChildren}</div>;
// }

// function CollapsibleTrigger({ children, onClick }) {
//   return (
//     <button onClick={onClick} className="cursor-pointer">
//       {children}
//     </button>
//   );
// }
// CollapsibleTrigger.displayName = "CollapsibleTrigger";

// function CollapsibleContent({ children, isOpen }) {
//   return (
//     <div style={{ display: isOpen ? "block" : "none" }}>
//       {children}
//     </div>
//   );
// }
// CollapsibleContent.displayName = "CollapsibleContent";

// export { Collapsible, CollapsibleTrigger, CollapsibleContent };







import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
