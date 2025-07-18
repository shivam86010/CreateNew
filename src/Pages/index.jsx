import React, { useState, useEffect } from "react";
import HeroSection from "../Components/Sections/HeroSection";


import {Button} from "../Components/Ui/Button";




import { ArrowUp, Command, Mic, MicOff } from "lucide-react";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [currentTheme, setCurrentTheme] = useState("cyber-purple");
  const [isGlitchMode, setIsGlitchMode] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState({
    isOpen: false,
    level: 0,
    title: "",
    questions: []
  });

//   const { toast } = useToast();

  const handleCommandPaletteNavigate = (section) => {
    const element = document.getElementById(`${section}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      const levelMap = {
        'about': 1,
        'projects': 2,
        'coding': 3,
        'garden': 4,
        'contact': 5
      };
      const targetLevel = levelMap[section];
      if (targetLevel && unlockedLevels.includes(targetLevel)) {
        setCurrentLevel(targetLevel);
      }
    }
  };

 
  

  useEffect(() => {
    const themes = {
      "cyber-purple": {
        "--primary": "263 70% 50%",
        "--neon-cyan": "180 100% 50%",
        "--electric-blue": "220 100% 50%",
        "--neon-pink": "320 100% 50%"
      },
      "neon-green": {
        "--primary": "120 100% 50%",
        "--neon-cyan": "180 100% 50%",
        "--electric-blue": "220 100% 50%",
        "--neon-pink": "320 100% 50%"
      },
      "electric-blue": {
        "--primary": "220 100% 50%",
        "--neon-cyan": "180 100% 50%",
        "--electric-blue": "220 100% 50%",
        "--neon-pink": "320 100% 50%"
      },
      "hot-pink": {
        "--primary": "320 100% 50%",
        "--neon-cyan": "180 100% 50%",
        "--electric-blue": "220 100% 50%",
        "--neon-pink": "320 100% 50%"
      },
      "sunset-orange": {
        "--primary": "30 100% 50%",
        "--neon-cyan": "180 100% 50%",
        "--electric-blue": "220 100% 50%",
        "--neon-pink": "320 100% 50%"
      }
    };
    const theme = themes[currentTheme];
    if (theme) {
      Object.entries(theme).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
      });
    }
  }, [currentTheme]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStartGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started! 🎮",
      description: "Welcome to the interactive portfolio experience!"
    });
    setTimeout(() => {
      const aboutSection = document.getElementById('about-section');
      aboutSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleQuizComplete = (passed, level) => {
    if (passed) {
      const nextLevel = level + 1;
      if (!unlockedLevels.includes(nextLevel) && nextLevel <= 6) {
        setUnlockedLevels(prev => [...prev, nextLevel]);
        setCompletedQuizzes(prev => [...prev, `level-${level}`]);
        setCurrentLevel(nextLevel);
        toast({
          title: "Level Unlocked! 🚀",
          description: `Congratulations! You've unlocked Level ${nextLevel}`
        });
        setTimeout(() => {
          const sections = ['about', 'projects', 'coding', 'garden', 'contact'];
          const nextSection = document.getElementById(`${sections[nextLevel - 1]}-section`);
          nextSection?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    } else {
      toast({
        title: "Try Again! 📚",
        description: "You need 70% to unlock the next level",
        variant: "destructive"
      });
    }
  };

  const openQuiz = (level) => {
    const quizzes = {
      1: { title: "About Me Quiz", questions: aboutQuiz },
      2: { title: "Projects Quiz", questions: projectsQuiz },
      3: { title: "Live Coding Quiz", questions: experienceQuiz },
      4: { title: "Digital Garden Quiz", questions: aboutQuiz },
      5: { title: "Contact Quiz", questions: experienceQuiz }
    };
    const quiz = quizzes[level];
    if (quiz) {
      setActiveQuiz({ isOpen: true, level, title: quiz.title, questions: quiz.questions });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!gameStarted) {
    return (
      <HeroSection
        onStartGame={handleStartGame}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        isGlitchMode={isGlitchMode}
        onToggleGlitch={() => setIsGlitchMode(!isGlitchMode)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <Button variant="gaming" size="icon" className="rounded-full shadow-glow-primary">
          <Command className="w-4 h-4" />
        </Button>
       
       
        <Button onClick={scrollToTop} variant="secondary" size="icon" className="rounded-full">
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
      <div className="fixed bottom-6 left-6 z-40">
        <Button onClick={() => {
          setGameStarted(false);
          setCurrentLevel(1);
          setUnlockedLevels([1]);
          setCompletedQuizzes([]);
          voiceNav.stopListening();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} variant="glitch" size="sm" className={isGlitchMode ? "animate-glitch" : ""}>
          🎮 Restart Game
        </Button>
      </div>
    </div>
  );
};

export default Index;
