import { Button } from "../Components/Ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/Ui/Card";
import { Lock, CheckCircle } from "lucide-react";

export const LevelSection = ({ level, title, icon, isUnlocked, isCompleted, children, onUnlock, className = "" }) => {
  if (!isUnlocked) {
    return (
      <Card className={`relative overflow-hidden border-2 border-dashed border-primary/30 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm" />
        <CardContent className="relative flex flex-col items-center justify-center min-h-96 text-center p-8">
          <div className="text-6xl mb-4 opacity-50">{icon}</div>
          <Lock className="w-8 h-8 text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold mb-2 text-muted-foreground">Level {level} Locked</h3>
          <p className="text-muted-foreground mb-6">Complete the previous level to unlock {title}</p>
          {onUnlock && (
            <Button onClick={onUnlock} variant="unlock" size="lg" className="animate-pulse-glow">
              Take Quiz to Unlock
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 border-primary/40 shadow-glow-primary ${className} animate-level-unlock`}>
      <CardHeader className="bg-gradient-primary text-white">
        <CardTitle className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span>Level {level}: {title}</span>
              {isCompleted && <CheckCircle className="w-5 h-5 text-cyber-green" />}
            </div>
            <div className="text-sm opacity-90">Unlocked and ready to explore!</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};
