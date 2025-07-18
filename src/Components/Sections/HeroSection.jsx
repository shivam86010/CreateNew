import { useState, useEffect } from "react";
import { Button } from "../Ui/Button";
import { Badge } from "../Ui/Badge";
import { ThemePicker } from "../../Components/ThemePicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../Ui/DropdownMenu";
import {
  Zap,
  Terminal,
  Gamepad2,
  Sparkles,
  Menu,
  Timer,
  Brain,
  Wrench,
} from "lucide-react";

const HeroSection = ({
  onStartGame,
  currentTheme,
  onThemeChange,
  isGlitchMode,
  onToggleGlitch,
}) => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const fullText = "Welcome to Shivam's Interactive Portfolio";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="w-4 h-4 mr-2" />
                Extras
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem > <Timer className="w-4 h-4 mr-2" /> Speedrun Challenge </DropdownMenuItem>
              <DropdownMenuItem > <Brain className="w-4 h-4 mr-2" /> Interview Questions </DropdownMenuItem>
              <DropdownMenuItem > <Wrench className="w-4 h-4 mr-2" /> SaaS Tools </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={onToggleGlitch}
            variant={isGlitchMode ? "cyber" : "gaming"}
            size="sm"
            className={isGlitchMode ? "animate-glitch" : ""}
          >
            <Terminal className="w-4 h-4 mr-2" />
            {isGlitchMode ? "GLITCH" : "Normal"}
          </Button>

          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
            <Gamepad2 className="w-3 h-3 mr-1" />
            Interactive Mode
          </Badge>
        </div>

        <ThemePicker currentTheme={currentTheme} onThemeChange={onThemeChange} />
      </div>

      <div className="text-center space-y-8 px-6 max-w-4xl relative z-10">
        <div className="space-y-4">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent ${
              isGlitchMode ? "animate-glitch" : ""
            }`}
          >
            {typedText}
            <span
              className={`$ {
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              |
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
            Level up your hiring process with an interactive gaming experience
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onStartGame}
            variant="gaming"
            size="hero"
            className="group relative overflow-hidden"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
            Start Gaming Experience
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>

          <Button variant="level" size="lg">
            <Zap className="w-4 h-4 mr-2" />
            Quick Portfolio View
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { icon: "🎮", label: "4 Levels", desc: "Interactive sections" },
            { icon: "🧠", label: "Smart Quizzes", desc: "Unlock content" },
            { icon: "⌨️", label: "Command Palette", desc: "Quick navigation" },
            { icon: "🎨", label: "5 Themes", desc: "Customize experience" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-all duration-300 hover:scale-105"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className="font-semibold text-sm">{feature.label}</div>
              <div className="text-xs text-muted-foreground">{feature.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

