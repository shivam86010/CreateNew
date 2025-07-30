import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/Ui/Card";
import { Button } from "../Components/Ui/Button";
import { Badge } from "../Components/Ui/Badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Brain, Code, Eye, EyeOff, Lightbulb, ChevronDown, ChevronRight } from "lucide-react";



const questions = [
  {
    id: "1",
    question: "What are React Hooks and why were they introduced?",
    category: "React",
    difficulty: "Medium",
    answer: "React Hooks are functions that let you use state and other React features in functional components. They were introduced to solve several problems: sharing stateful logic between components, complex components becoming hard to understand, and classes being confusing for both people and machines.",
    codeExample: `// Before Hooks (Class Component)
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

// After Hooks (Functional Component)
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}`,
    hints: [
      "Think about the problems with class components",
      "Consider reusability of stateful logic",
      "Remember the 'this' binding issues in classes"
    ],
    thoughtProcess: "When answering this question, I first explain what hooks are, then dive into the 'why' - the problems they solve. I always mention the three main issues: reusing stateful logic, complex components, and confusion with classes.",
    realWorldUsage: "In every React project I work on, hooks are essential. useState for component state, useEffect for side effects, and custom hooks for sharing logic across components."
  },
  {
    id: "2",
    question: "Explain the difference between '==' and '===' in JavaScript",
    category: "JavaScript",
    difficulty: "Easy",
    answer: "'==' performs type coercion before comparison (loose equality), while '===' compares both value and type without coercion (strict equality). Always prefer '===' unless you specifically need type coercion.",
    codeExample: `// Loose equality (==)
console.log(5 == "5");    // true (string "5" is coerced to number 5)
console.log(true == 1);   // true (boolean true is coerced to number 1)
console.log(null == undefined); // true (special case)

// Strict equality (===)
console.log(5 === "5");   // false (different types)
console.log(true === 1);  // false (different types)
console.log(null === undefined); // false (different types)

// Why strict equality is preferred
const userInput = "0";
if (userInput == false) {  // true - probably not what you want!
  console.log("This runs unexpectedly");
}

if (userInput === false) { // false - more predictable
  console.log("This won't run");
}`,
    hints: [
      "Think about type conversion",
      "Consider which one is more predictable",
      "Remember the falsy values in JavaScript"
    ],
    thoughtProcess: "I always start with the basic definition, then show practical examples where the difference matters. The key is explaining why === is generally preferred - it's more predictable and avoids unexpected type coercion bugs.",
    realWorldUsage: "In production code, I use === almost exclusively. It prevents subtle bugs that can be hard to track down, especially when dealing with user input or API responses."
  },
  {
    id: "3",
    question: "How does CSS Flexbox work and when would you use it?",
    category: "CSS",
    difficulty: "Medium",
    answer: "Flexbox is a CSS layout method that arranges items in a one-dimensional space (either row or column). It's perfect for distributing space and aligning items, especially when the size of items is unknown or dynamic.",
    codeExample: `.flex-container {
  display: flex;
  justify-content: space-between; /* main axis alignment */
  align-items: center;            /* cross axis alignment */
  flex-direction: row;            /* default: row */
  flex-wrap: wrap;                /* allow wrapping */
}

.flex-item {
  flex: 1;                        /* grow, shrink, basis */
  /* OR more specific: */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
}

/* Common patterns */
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-between-layout {
  display: flex;
  justify-content: space-between;
}

.responsive-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.responsive-cards > * {
  flex: 1 1 300px; /* grow, shrink, min-width */
}`,
    hints: [
      "Think about main axis vs cross axis",
      "Consider when you need one-dimensional layouts",
      "Remember the common alignment patterns"
    ],
    thoughtProcess: "I explain flexbox by first clarifying it's one-dimensional (vs Grid which is two-dimensional), then cover the main concepts: main/cross axis, justify-content/align-items, and flex properties. I always include practical examples.",
    realWorldUsage: "I use flexbox constantly for navigation bars, card layouts, centering elements, and responsive designs. It's my go-to for most layout challenges that don't require complex two-dimensional grids."
  },
  {
    id: "4",
    question: "What is the event loop in JavaScript?",
    category: "JavaScript",
    difficulty: "Hard",
    answer: "The event loop is JavaScript's concurrency model that handles asynchronous operations. It continuously checks the call stack and task queues, moving tasks from queues to the call stack when the stack is empty. This enables non-blocking behavior in a single-threaded environment.",
    codeExample: `console.log('1'); // Synchronous

setTimeout(() => {
  console.log('2'); // Macrotask queue
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // Microtask queue
});

console.log('4'); // Synchronous

// Output: 1, 4, 3, 2
// Explanation:
// 1. '1' and '4' execute immediately (call stack)
// 2. Promise callback goes to microtask queue
// 3. setTimeout callback goes to macrotask queue  
// 4. Microtasks are processed before macrotasks
// 5. So '3' runs before '2'

// Another example with multiple promises
console.log('start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve()
  .then(() => console.log('promise 1'))
  .then(() => console.log('promise 2'));

console.log('end');

// Output: start, end, promise 1, promise 2, timeout`,
    hints: [
      "Think about the call stack and different types of queues",
      "Consider the priority order: microtasks vs macrotasks",
      "Remember that JavaScript is single-threaded"
    ],
    thoughtProcess: "This is a complex topic, so I break it down step by step: first explain what the event loop is and why it exists, then detail the different queues and their priorities, and finally provide concrete examples that demonstrate the execution order.",
    realWorldUsage: "Understanding the event loop is crucial for debugging timing issues, optimizing performance, and writing predictable asynchronous code. It helps explain why certain async operations happen in a specific order."
  }
];

const categories = ["All", "React", "JavaScript", "CSS", "General"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function InterviewQuestions() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const [showAnswers, setShowAnswers] = useState(new Set());
  const [showHints, setShowHints] = useState(new Set());

  const filteredQuestions = questions.filter(q => {
    const categoryMatch = selectedCategory === "All" || q.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const toggleAnswer = (id) => {
    const newShowAnswers = new Set(showAnswers);
    if (newShowAnswers.has(id)) {
      newShowAnswers.delete(id);
    } else {
      newShowAnswers.add(id);
    }
    setShowAnswers(newShowAnswers);
  };

  const toggleHints = (id) => {
    const newShowHints = new Set(showHints);
    if (newShowHints.has(id)) {
      newShowHints.delete(id);
    } else {
      newShowHints.add(id);
    }
    setShowHints(newShowHints);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/10 text-green-500 border-green-500/30";
      case "Medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "Hard": return "bg-red-500/10 text-red-500 border-red-500/30";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "React": return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "JavaScript": return "bg-purple-500/10 text-purple-500 border-purple-500/30";
      case "CSS": return "bg-pink-500/10 text-pink-500 border-pink-500/30";
      case "General": return "bg-gray-500/10 text-gray-500 border-gray-500/30";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Frontend Interview Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real interview questions I've encountered, with detailed explanations and thought processes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground self-center">Category:</span>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground self-center">Difficulty:</span>
            {difficulties.map(difficulty => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Questions */}
        {/* <div className="space-y-6">
          {filteredQuestions.map((question) => (
            <Card key={question.id} className="overflow-hidden">
              <Collapsible 
                open={expandedQuestions.has(question.id)} 
                onOpenChange={() => toggleExpanded(question.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={getCategoryColor(question.category)}>
                            {question.category}
                          </Badge>
                          <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-left text-lg">
                          {question.question}
                        </CardTitle>
                      </div>
                      {expandedQuestions.has(question.id) ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <Tabs defaultValue="think" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="think">Think First</TabsTrigger>
                        <TabsTrigger value="hints">Hints</TabsTrigger>
                        <TabsTrigger value="answer">Answer</TabsTrigger>
                        <TabsTrigger value="usage">Real Usage</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="think" className="space-y-4">
                        <div className="bg-secondary/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Brain className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold">My Thought Process</h3>
                          </div>
                          <p className="text-muted-foreground">{question.thoughtProcess}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-4">
                            Take a moment to think about this question, then check the hints or answer.
                          </p>
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleHints(question.id)}
                            >
                              <Lightbulb className="w-4 h-4 mr-2" />
                              {showHints.has(question.id) ? "Hide Hints" : "Show Hints"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleAnswer(question.id)}
                            >
                              {showAnswers.has(question.id) ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                              {showAnswers.has(question.id) ? "Hide Answer" : "Show Answer"}
                            </Button>
                          </div>
                        </div>
                        
                        {showHints.has(question.id) && (
                          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-600 mb-2">💡 Hints:</h4>
                            <ul className="space-y-1">
                              {question.hints.map((hint, index) => (
                                <li key={index} className="text-sm text-muted-foreground">
                                  • {hint}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {showAnswers.has(question.id) && (
                          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                            <h4 className="font-medium text-green-600 mb-2">✅ Answer:</h4>
                            <p className="text-sm">{question.answer}</p>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="hints">
                        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-5 h-5 text-blue-500" />
                            <h3 className="font-semibold text-blue-600">Hints to Guide You</h3>
                          </div>
                          <ul className="space-y-2">
                            {question.hints.map((hint, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary font-bold">{index + 1}.</span>
                                <span>{hint}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="answer" className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Eye className="w-5 h-5 text-green-500" />
                            <h3 className="font-semibold text-green-600">Complete Answer</h3>
                          </div>
                          <p className="mb-4">{question.answer}</p>
                        </div>
                        
                        {question.codeExample && (
                          <div className="bg-secondary/30 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <Code className="w-5 h-5 text-primary" />
                              <h3 className="font-semibold">Code Example</h3>
                            </div>
                            <pre className="bg-black/10 p-4 rounded overflow-x-auto text-sm">
                              <code>{question.codeExample}</code>
                            </pre>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="usage">
                        <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Brain className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold">Real-World Usage</h3>
                          </div>
                          <p>{question.realWorldUsage}</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div> */}
        
        {/* {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No questions found for the selected filters.</p>
          </div>
        )} */}
      </div>
    </div>
  );
}
