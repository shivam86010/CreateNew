import { Progress } from "../Components/Ui/Progress";
import { Badge } from "../Components/Ui/Badge";
import { Trophy, Lock, CheckCircle } from "lucide-react";

export const GameProgress = ({ currentLevel, totalLevels, unlockedLevels, completedQuizzes }) => {
  const progressPercentage = (unlockedLevels.length / totalLevels) * 100;

  const levels = [
    { id: 1, name: "About", icon: "👤", required: 0 },
    { id: 2, name: "Projects", icon: "🚀", required: 1 },
    { id: 3, name: "Experience", icon: "💼", required: 2 },
    { id: 4, name: "Contact", icon: "📧", required: 3 }
  ];

  return (
    <div className="fixed top-4 right-4 z-50 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-4 min-w-64">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5 text-primary" />
        <span className="font-bold text-sm">Portfolio Progress</span>
        <Badge variant="secondary" className="ml-auto">
          {unlockedLevels.length}/{totalLevels}
        </Badge>
      </div>

      <Progress value={progressPercentage} className="mb-4 h-2" />

      <div className="space-y-2">
        {levels.map((level) => {
          const isUnlocked = unlockedLevels.includes(level.id);
          const isCurrent = currentLevel === level.id;
          const hasQuiz = completedQuizzes.includes(`level-${level.id}`);

          return (
            <div
              key={level.id}
              className={`flex items-center gap-3 p-2 rounded-md transition-all duration-300 ${
                isCurrent
                  ? "bg-primary/20 border border-primary/40"
                  : isUnlocked
                  ? "bg-secondary/50"
                  : "bg-muted/30"
              }`}
            >
              <span className="text-lg">{level.icon}</span>
              <span className={`text-sm font-medium ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                {level.name}
              </span>
              <div className="ml-auto flex gap-1">
                {hasQuiz && <CheckCircle className="w-4 h-4 text-cyber-green" />}
                {!isUnlocked && <Lock className="w-4 h-4 text-muted-foreground" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
