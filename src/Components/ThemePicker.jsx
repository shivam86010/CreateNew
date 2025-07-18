import { useState } from "react";
import { Button } from "./Ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Ui/Popover";
import { Palette, Check } from "lucide-react";

export const ThemePicker = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: "cyber-purple",
      name: "Cyber Purple",
      primary: "hsl(263, 70%, 50%)",
      accent: "hsl(180, 100%, 50%)",
      gradient: "linear-gradient(135deg, hsl(263, 70%, 50%), hsl(180, 100%, 50%))",
    },
    {
      id: "neon-green",
      name: "Neon Green",
      primary: "hsl(120, 100%, 50%)",
      accent: "hsl(320, 100%, 50%)",
      gradient: "linear-gradient(135deg, hsl(120, 100%, 50%), hsl(320, 100%, 50%))",
    },
    {
      id: "electric-blue",
      name: "Electric Blue",
      primary: "hsl(220, 100%, 50%)",
      accent: "hsl(60, 100%, 50%)",
      gradient: "linear-gradient(135deg, hsl(220, 100%, 50%), hsl(60, 100%, 50%))",
    },
    {
      id: "hot-pink",
      name: "Hot Pink",
      primary: "hsl(320, 100%, 50%)",
      accent: "hsl(180, 100%, 50%)",
      gradient: "linear-gradient(135deg, hsl(320, 100%, 50%), hsl(180, 100%, 50%))",
    },
    {
      id: "sunset-orange",
      name: "Sunset Orange",
      primary: "hsl(30, 100%, 50%)",
      accent: "hsl(280, 100%, 50%)",
      gradient: "linear-gradient(135deg, hsl(30, 100%, 50%), hsl(280, 100%, 50%))",
    },
  ];

  const handleThemeSelect = (themeId) => {
    onThemeChange(themeId);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="gaming" size="sm" className="gap-2">
          <Palette className="w-4 h-4" />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 bg-card/95 backdrop-blur-sm border-primary/30">
        <h3 className="font-semibold mb-3 text-sm">Choose Your Theme</h3>
        <div className="space-y-2">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors border border-transparent hover:border-primary/20"
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-white/20"
                style={{ background: theme.gradient }}
              />
              <span className="text-sm font-medium flex-1 text-left">
                {theme.name}
              </span>
              {currentTheme === theme.id && (
                <Check className="w-4 h-4 text-cyber-green" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
