import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "../Components/Ui/Dialog";
import { Input } from "../Components/Ui/Input";
import {Command, CommandEmpty, CommandGroup,CommandInput,CommandItem,CommandList, } from "../Components/Ui/Commond";
import {Search, User, Briefcase, Mail,Code, Terminal,} from "lucide-react";

export const CommandPalette = ({ isOpen, onClose, onNavigate, unlockedLevels }) => {
  const [query, setQuery] = useState("");

  const commands = [
    {
      id: "about",
      name: "About Me",
      icon: User,
      level: 1,
      description: "Learn about my background and skills",
    },
    {
      id: "projects",
      name: "Projects",
      icon: Briefcase,
      level: 2,
      description: "Explore my portfolio projects",
    },
    {
      id: "coding",
      name: "Live Coding",
      icon: Code,
      level: 3,
      description: "Interactive coding challenges",
    },
    {
      id: "garden",
      name: "Digital Garden",
      icon: Search,
      level: 4,
      description: "Knowledge base and snippets",
    },
    {
      id: "contact",
      name: "Contact",
      icon: Mail,
      level: 5,
      description: "Get in touch with me",
    },
    {
      id: "terminal",
      name: "Terminal Mode",
      icon: Terminal,
      level: 0,
      description: "Switch to terminal interface",
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(query.toLowerCase()) &&
      (cmd.level === 0 || unlockedLevels.includes(cmd.level))
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // Open palette logic handled by parent
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (commandId) => {
    onNavigate(commandId);
    onClose();
    setQuery("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-lg bg-card/95 backdrop-blur-sm border-primary/30">
        <Command className="rounded-lg border-none">
          <div className="flex items-center border-b border-primary/20 px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <CommandInput
              placeholder="Search portfolio sections..."
              value={query}
              onValueChange={setQuery}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none"
            />
          </div>
          <CommandList className="max-h-80 overflow-y-auto">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No sections found.
            </CommandEmpty>
            <CommandGroup heading="Portfolio Sections">
              {filteredCommands.map((command) => {
                const Icon = command.icon;
                const isLocked =
                  command.level > 0 && !unlockedLevels.includes(command.level);

                return (
                  <CommandItem
                    key={command.id}
                    value={command.name}
                    onSelect={() => !isLocked && handleSelect(command.id)}
                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-primary/10 ${
                      isLocked ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isLocked}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{command.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {command.description}
                      </div>
                    </div>
                    {isLocked && (
                      <div className="text-xs bg-muted px-2 py-1 rounded">
                        Locked
                      </div>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          <div className="border-t border-primary/20 px-3 py-2 text-xs text-muted-foreground">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘K</kbd> or{" "}
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl+K</kbd>{" "}
            to open
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
