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



const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const emojis = ['🎮', '🚀', '⭐', '🎯', '🔥', '💎', '🎨', '🎭'];

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled.map((_, index) => index));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameStarted(true);
  };

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      const firstEmoji = emojis[Math.floor(first / 2)];
      const secondEmoji = emojis[Math.floor(second / 2)];

      if (firstEmoji === secondEmoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isGameWon = matched.length === 16 && gameStarted;

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="flex justify-center gap-4">
          <Badge variant="secondary">Moves: {moves}</Badge>
          {isGameWon && (
            <Badge variant="default">
              <Trophy className="w-4 h-4 mr-2" />
              You Won!
            </Badge>
          )}
        </div>
      </div>

      {!gameStarted ? (
        <div className="text-center">
          <Button onClick={initializeGame} variant="gaming" size="lg">
            Start Memory Game
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
            {cards.map((cardIndex, index) => (
              <Button
                key={index}
                variant="outline"
                className="!h-16 !w-16 !text-2xl"
                onClick={() => handleCardClick(index)}
                disabled={flipped.includes(index) || matched.includes(index)}
              >
                {flipped.includes(index) || matched.includes(index) 
                  ? emojis[Math.floor(cardIndex / 2)]
                  : '❓'
                }
              </Button>
            ))}
          </div>
          
          <div className="text-center">
            <Button onClick={initializeGame} variant="gaming">
              <RotateCcw className="w-4 h-4 mr-2" />
              New Game
            </Button>
          </div>
        </>
      )}
    </div>
  );
};


const NumberPuzzle = () => {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGame = () => {
    const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
    numbers.push(0); // Empty space
    
    // Shuffle the array
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    setTiles(numbers);
    setMoves(0);
    setGameStarted(true);
  };

  const getEmptyIndex = () => tiles.indexOf(0);

  const canMove = (index) => {
    const emptyIndex = getEmptyIndex();
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  const moveTile = (index) => {
    if (!canMove(index)) return;

    const emptyIndex = getEmptyIndex();
    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    
    setTiles(newTiles);
    setMoves(moves + 1);
  };

  const isWon = () => {
    for (let i = 0; i < 15; i++) {
      if (tiles[i] !== i + 1) return false;
    }
    return tiles[15] === 0;
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="flex justify-center gap-4">
          <Badge variant="secondary">Moves: {moves}</Badge>
          {isWon() && gameStarted && (
            <Badge variant="default">
              <Trophy className="w-4 h-4 mr-2" />
              Puzzle Solved!
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Arrange numbers 1-15 in order
        </p>
      </div>

      {!gameStarted ? (
        <div className="text-center">
          <Button onClick={initializeGame} variant="gaming" size="lg">
            Start Number Puzzle
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-1 max-w-xs mx-auto">
            {tiles.map((tile, index) => (
              <Button
                key={index}
                variant={tile === 0 ? "ghost" : "outline"}
                className="h-16 w-16 text-lg font-bold"
                onClick={() => moveTile(index)}
                disabled={tile === 0 || !canMove(index)}
              >
                {tile || ''}
              </Button>
            ))}
          </div>
          
          <div className="text-center">
            <Button onClick={initializeGame} variant="gaming">
              <RotateCcw className="w-4 h-4 mr-2" />
              Shuffle
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const SudokuGame = () => {
  const [grid, setGrid] = useState([]);
  const [initialGrid, setInitialGrid] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [errors, setErrors] = useState(new Set());

  const generateSudoku = () => {
    // Create a simple Sudoku puzzle (simplified version)
    const puzzle = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    
    setGrid(puzzle.map(row => [...row]));
    setInitialGrid(puzzle.map(row => [...row]));
    setGameStarted(true);
    setErrors(new Set());
  };

  const isValidMove = (grid, row, col, num) => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (x !== col && grid[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
      if (x !== row && grid[x][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if ((i !== row || j !== col) && grid[i][j] === num) return false;
      }
    }
    
    return true;
  };

  const handleCellChange = (row, col, value) => {
    if (initialGrid[row][col] !== 0) return; // Don't allow editing initial numbers
    
    const num = parseInt(value) || 0;
    const newGrid = [...grid];
    newGrid[row][col] = num;
    
    const newErrors = new Set(errors);
    const cellKey = `${row}-${col}`;
    
    if (num !== 0 && !isValidMove(newGrid, row, col, num)) {
      newErrors.add(cellKey);
    } else {
      newErrors.delete(cellKey);
    }
    
    setGrid(newGrid);
    setErrors(newErrors);
  };

  const isCompleted = () => {
    return grid.every(row => row.every(cell => cell !== 0)) && errors.size === 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        {isCompleted() && gameStarted && (
          <Badge variant="default" className="text-lg px-4 py-2 mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Puzzle Solved!
          </Badge>
        )}
      </div>

      {!gameStarted ? (
        <div className="text-center">
          <Button onClick={generateSudoku} variant="gaming" size="lg">
            Start Sudoku
          </Button>
        </div>
      ) : (
        <>
          <div className="max-w-lg mx-auto">
            <div className="grid grid-cols-9 gap-0 border-4 border-gray-800 bg-white">
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <input
                    key={`${rowIndex}-${colIndex}`}
                    type="number"
                    min="1"
                    max="9"
                    value={cell || ''}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    disabled={initialGrid[rowIndex][colIndex] !== 0}
                    className={`w-10 h-10 text-center text-lg font-bold border border-gray-300
                      ${initialGrid[rowIndex][colIndex] !== 0 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-white text-blue-600'}
                      ${errors.has(`${rowIndex}-${colIndex}`) ? 'bg-red-100 text-red-600' : ''}
                      ${(Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0 
                        ? 'bg-blue-50' : 'bg-white'}
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${colIndex % 3 === 2 ? 'border-r-2 border-r-gray-800' : ''}
                      ${rowIndex % 3 === 2 ? 'border-b-2 border-b-gray-800' : ''}`}
                  />
                ))
              )}
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Fill the grid so each row, column, and 3×3 box contains digits 1-9
            </p>
            {errors.size > 0 && (
              <p className="text-sm text-red-600">
                {errors.size} invalid move(s) - fix conflicts highlighted in red
              </p>
            )}
            <Button onClick={generateSudoku} variant="gaming">
              <RotateCcw className="w-4 h-4 mr-2" />
              New Puzzle
            </Button>
          </div>
        </>
      )}
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
      component: <MemoryGame />
    },
    {
      id: 'puzzle',
      title: 'Number Puzzle',
      description: 'Slide tiles to arrange numbers 1-15',
      icon: '🧩',
      component: <NumberPuzzle />
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
      component: <SudokuGame />
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
