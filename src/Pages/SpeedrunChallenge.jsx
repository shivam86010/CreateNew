import React from 'react'
import { useState, useEffect } from "react";
import { Button } from "../Components/Ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/Ui/Card";
import { Badge } from "../Components/Ui/Badge";
import { Timer, Trophy, Code, Play, RotateCcw, CheckCircle } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

const challenges = [
  {
    id: "1",
    title: "Missing Button Styles",
    description: "Fix the button that has no styling and make it look proper",
    brokenCode: `<button onclick="alert('Hello!')">\n  Click me\n</button>`,
    fixedCode: `<button \n  onclick="alert('Hello!')" \n  style="background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;"\n>\n  Click me\n</button>`,
    difficulty: "Easy",
    timeLimit: 120,
  },
  {
    id: "2",
    title: "Broken Flexbox Layout",
    description: "Fix the flexbox layout that's not centering properly",
    brokenCode: `.container {\n  display: flex;\n  height: 100vh;\n}\n\n.centered-box {\n  background: #f0f0f0;\n  padding: 20px;\n  width: 200px;\n}`,
    fixedCode: `.container {\n  display: flex;\n  height: 100vh;\n  justify-content: center;\n  align-items: center;\n}\n\n.centered-box {\n  background: #f0f0f0;\n  padding: 20px;\n  width: 200px;\n}`,
    difficulty: "Easy",
    timeLimit: 180,
  },
  {
    id: "3",
    title: "React State Bug",
    description: "Fix the counter that's not updating properly",
    brokenCode: `function Counter() {\n  let count = 0;\n  \n  const increment = () => {\n    count = count + 1;\n  };\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>+</button>\n    </div>\n  );\n}`,
    fixedCode: `function Counter() {\n  const [count, setCount] = React.useState(0);\n  \n  const increment = () => {\n    setCount(count + 1);\n  };\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>+</button>\n    </div>\n  );\n}`,
    difficulty: "Medium",
    timeLimit: 300,
  },
];
function SpeedrunChallenge() {
    const formatTime = (second)=>{
        const mins=Math.floor(second/60)
        const sec= (second%60).toString().padStart(2, '0');
        return `${mins} : ${sec}`
    }

    const getDifficultyColor = (difficulty)=>{
        switch(difficulty){
            case 'Easy' : 
                return "bg-green-500/10 text-green-500 border-green-500/30";
            case 'Medium' :
                return  "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
            case 'Hard' : 
                return "bg-red-500/10 text-red-500 border-red-500/30";
            default : 
                return "bg-gray-500/10 text-gray-500 border-gray-500/30";        
        }
    }
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Frontend Speedrun Challenge
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Test your frontend debugging skills! Fix broken UI components as fast as you can.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Choose Your Challenge</h2>
            <div className="grid gap-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="hover:border-primary/50 transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {challenge.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Timer className="w-4 h-4" />
                          {formatTime(challenge.timeLimit)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{challenge.description}</p>
                    <Button onClick={() => startChallenge(challenge)} className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Start Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              {/* <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-sm text-muted-foreground">{entry.challenge}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold">{entry.time}</div>
                        <div className="text-xs text-primary">#{index + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent> */}
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Choose a challenge based on difficulty</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Fix the broken code in the live editor</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Submit your solution before time runs out</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>Climb the leaderboard with your best times!</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpeedrunChallenge






// const challenges = [
//   {
//     id: "1",
//     title: "Missing Button Styles",
//     description: "Fix the button that has no styling and make it look proper",
//     brokenCode: `<button onclick="alert('Hello!')">\n  Click me\n</button>`,
//     fixedCode: `<button \n  onclick="alert('Hello!')" \n  style="background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;"\n>\n  Click me\n</button>`,
//     difficulty: "Easy",
//     timeLimit: 120,
//   },
//   {
//     id: "2",
//     title: "Broken Flexbox Layout",
//     description: "Fix the flexbox layout that's not centering properly",
//     brokenCode: `.container {\n  display: flex;\n  height: 100vh;\n}\n\n.centered-box {\n  background: #f0f0f0;\n  padding: 20px;\n  width: 200px;\n}`,
//     fixedCode: `.container {\n  display: flex;\n  height: 100vh;\n  justify-content: center;\n  align-items: center;\n}\n\n.centered-box {\n  background: #f0f0f0;\n  padding: 20px;\n  width: 200px;\n}`,
//     difficulty: "Easy",
//     timeLimit: 180,
//   },
//   {
//     id: "3",
//     title: "React State Bug",
//     description: "Fix the counter that's not updating properly",
//     brokenCode: `function Counter() {\n  let count = 0;\n  \n  const increment = () => {\n    count = count + 1;\n  };\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>+</button>\n    </div>\n  );\n}`,
//     fixedCode: `function Counter() {\n  const [count, setCount] = React.useState(0);\n  \n  const increment = () => {\n    setCount(count + 1);\n  };\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>+</button>\n    </div>\n  );\n}`,
//     difficulty: "Medium",
//     timeLimit: 300,
//   },
// ];

// const leaderboard = [
//   { name: "Alex", time: "1:23", challenge: "Missing Button Styles" },
//   { name: "Sarah", time: "2:45", challenge: "Broken Flexbox Layout" },
//   { name: "Mike", time: "4:12", challenge: "React State Bug" },
//   { name: "Emma", time: "1:56", challenge: "Missing Button Styles" },
// ];

// export default function SpeedrunChallenge() {
//   const [selectedChallenge, setSelectedChallenge] = useState(null);
//   const [userCode, setUserCode] = useState("");
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [completionTime, setCompletionTime] = useState(0);
//   const { toast } = useToast();

//   useEffect(() => {
//     let interval;
//     if (isRunning && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft((time) => {
//           if (time <= 1) {
//             setIsRunning(false);
//             toast({
//               title: "Time's up!",
//               description: "Better luck next time!",
//               variant: "destructive",
//             });
//             return 0;
//           }
//           return time - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isRunning, timeLeft, toast]);

//   const startChallenge = (challenge) => {
//     setSelectedChallenge(challenge);
//     setUserCode(challenge.brokenCode);
//     setTimeLeft(challenge.timeLimit);
//     setIsRunning(true);
//     setIsCompleted(false);
//     setCompletionTime(0);
//   };

//   const checkSolution = () => {
//     if (!selectedChallenge) return;
//     const userCodeNormalized = userCode.replace(/\s+/g, " ").trim();
//     const fixedCodeNormalized = selectedChallenge.fixedCode.replace(/\s+/g, " ").trim();
//     if (userCodeNormalized === fixedCodeNormalized) {
//       setIsCompleted(true);
//       setIsRunning(false);
//       const timeTaken = selectedChallenge.timeLimit - timeLeft;
//       setCompletionTime(timeTaken);
//       toast({
//         title: "Congratulations!",
//         description: `Challenge completed in ${Math.floor(timeTaken / 60)}:${(timeTaken % 60).toString().padStart(2, "0")}`,
//       });
//     } else {
//       toast({
//         title: "Not quite right",
//         description: "Keep trying! Check your solution carefully.",
//         variant: "destructive",
//       });
//     }
//   };

//   const resetChallenge = () => {
//     setSelectedChallenge(null);
//     setUserCode("");
//     setTimeLeft(0);
//     setIsRunning(false);
//     setIsCompleted(false);
//     setCompletionTime(0);
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "Easy":
//         return "bg-green-500/10 text-green-500 border-green-500/30";
//       case "Medium":
//         return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
//       case "Hard":
//         return "bg-red-500/10 text-red-500 border-red-500/30";
//       default:
//         return "bg-gray-500/10 text-gray-500 border-gray-500/30";
//     }
//   };

//   // JSX continues as per your provided layout
//   // You can split the JSX into subcomponents if needed for better structure

//   return (
//     <div className="min-h-screen p-6">React JSX output here...</div>
//   );
// }
