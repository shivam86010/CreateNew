import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../Components/Ui/Dialog";
import { Button } from "../Components/Ui/Button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
import { Progress } from "../Components/Ui/Progress";
import { Trophy, X } from "lucide-react";

export const QuizModal = ({ isOpen, onClose, onComplete, title, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (value) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = value;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct.toString()) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const handleFinish = () => {
    const passed = score >= Math.ceil(questions.length * 0.7);
    onComplete(passed);
    resetQuiz();
    onClose();
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const passed = score >= Math.ceil(questions.length * 0.7);

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-primary/30" aria-describedby="quiz-results-description">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className={`w-5 h-5 ${passed ? 'text-cyber-green' : 'text-warning-yellow'}`} />
              Quiz Results
            </DialogTitle>
          </DialogHeader>
          <div id="quiz-results-description" className="sr-only">
            Quiz completion results showing your score and whether you passed or failed
          </div>

          <div className="text-center py-6">
            <div className={`text-6xl mb-4 ${passed ? 'text-cyber-green' : 'text-warning-yellow'}`}>
              {passed ? '🎉' : '😅'}
            </div>
            <h3 className="text-xl font-bold mb-2">
              {passed ? 'Congratulations!' : 'Keep Trying!'}
            </h3>
            <p className="text-muted-foreground mb-4">
              You scored {score} out of {questions.length} questions correctly
            </p>
            <div className="text-2xl font-bold text-primary mb-6">
              {Math.round((score / questions.length) * 100)}%
            </div>

            {passed ? (
              <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-4 mb-4">
                <p className="text-cyber-green font-medium">Level Unlocked! 🚀</p>
                <p className="text-sm text-muted-foreground">You can now access the next section</p>
              </div>
            ) : (
              <div className="bg-warning-yellow/10 border border-warning-yellow/30 rounded-lg p-4 mb-4">
                <p className="text-warning-yellow font-medium">Try Again</p>
                <p className="text-sm text-muted-foreground">You need 70% to unlock the next level</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {!passed && (
              <Button onClick={resetQuiz} variant="secondary" className="flex-1">
                Retry Quiz
              </Button>
            )}
            <Button onClick={handleFinish} variant="gaming" className="flex-1">
              {passed ? 'Continue' : 'Close'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-sm border-primary/30" aria-describedby="quiz-description">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {title}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div id="quiz-description" className="sr-only">
          Interactive quiz with multiple choice questions to unlock the next portfolio section
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {currentQ && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{currentQ.question}</h3>

              <RadioGroup
                value={selectedAnswers[currentQuestion] || ""}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              variant="secondary"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion]}
              variant="gaming"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
