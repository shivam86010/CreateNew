import { useState } from "react";
import { Button } from "../Components/Ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/Ui/Card";
import { Badge } from "../Components/Ui/Badge";
import { ArrowLeft, RotateCcw, Trophy, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) setWinner(gameWinner);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        {winner ? (
          <Badge variant="default" className="!text-lg !px-4 !py-2">
            <Trophy className=" !w-4 !h-4 !mr-2" />
            Player {winner} Wins!
          </Badge>
        ) : (
          <Badge variant="secondary" className="!text-lg !px-4 !py-2">
            Player {isXNext ? 'X' : 'O'}'s Turn
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {board?.map((cell, index) => (
          <Button
            key={index}
            variant="outline"
            className="!h-16 !w-16 !text-2xl !font-bold"
            onClick={() => handleClick(index)}
          >
            {cell}
          </Button>
        ))}
      </div>
      
      <div className="text-center">
        <Button onClick={resetGame} variant="gaming">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Game
        </Button>
      </div>
    </div>
  );
};



export default function OfflineGames() {
  const [activeGame, setActiveGame] = useState(null);
  const navigate = useNavigate();

  const games = [
    {
      id: 'tic-tac-toe',
      title: 'Tic Tac Toe',
      description: 'Classic 3x3 grid game for two players',
      icon: '⭕',
      component: <TicTacToe />
    },
    {
      id: 'memory',
      title: 'Memory Game',
      description: 'Match pairs of cards to test your memory',
      icon: '🧠',
    //   component: <MemoryGame />
    },
    {
      id: 'puzzle',
      title: 'Number Puzzle',
      description: 'Slide tiles to arrange numbers 1-15',
      icon: '🧩',
    //   component: <NumberPuzzle />
    },
    {
      id: 'ludo',
      title: 'Ludo',
      description: 'Classic board game for 2-4 players',
      icon: '🎲',
    //   component: <LudoGame />
    },
    {
      id: 'chess',
      title: 'Chess',
      description: 'Strategic board game with classic pieces',
      icon: '♔',
    //   component: <ChessGame />
    },
    {
      id: 'sudoku',
      title: 'Sudoku',
      description: 'Number puzzle with 9x9 grid',
      icon: '🔢',
    //   component: <SudokuGame />
    }
  ];

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="outline"
                onClick={() => setActiveGame(null)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {game?.title}
              </h1>
            </div>

            <Card>
              <CardContent className="!p-8">
                {game?.component}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Offline Games
            </h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games?.map((game) => (
              <Card key={game.id} className="hover:border-primary/40 transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {game?.icon}
                  </div>
                  <CardTitle className="text-xl">{game?.title}</CardTitle>
                  <CardDescription>{game?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="gaming" 
                    className="w-full"
                    onClick={() => setActiveGame(game.id)}
                  >
                    Play Game
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Timer className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Fun Facts</span>
                </div>
                <p className="text-muted-foreground">
                  These games are built entirely in React with no external dependencies. 
                  Perfect for when you need a quick brain break during development!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
