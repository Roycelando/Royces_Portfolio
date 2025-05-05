import React, { useState, useRef, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStepBackward, 
  faStepForward, 
  faFastBackward, 
  faFastForward,
  faSave,
  faRobot,
  faClock,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';

const ChessContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BoardContainer = styled.div`
  background-color: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #4a4a4a;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #333;
  color: #00ff9d;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #444;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InputContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  background-color: #333;
  color: #e0e0e0;
  border: 1px solid #4a4a4a;
  padding: 0.5rem;
  border-radius: 4px;
  flex: 1;
`;

const SavedGames = styled.div`
  background-color: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #4a4a4a;
  min-width: 250px;
  max-width: 300px;
`;

const SavedGamesTitle = styled.h3`
  color: #00ff9d;
  margin-bottom: 1rem;
  text-align: center;
`;

const GameList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const GameItem = styled.li`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #e0e0e0;
  
  &:hover {
    background-color: #444;
  }
`;

const GameStats = styled.div`
  background-color: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #4a4a4a;
  margin-top: 1rem;
`;

const StatsTitle = styled.h3`
  color: #00ff9d;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StatItem = styled.div`
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.span`
  font-size: 1.5rem;
  color: #00ff9d;
  font-weight: bold;
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

const Timer = styled.div`
  color: #00ff9d;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
`;

const DifficultySelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DifficultyButton = styled(Button)<{ isActive: boolean }>`
  flex: 1;
  background-color: ${props => props.isActive ? '#444' : '#333'};
  border: 1px solid ${props => props.isActive ? '#00ff9d' : '#4a4a4a'};
`;

interface SavedGame {
  name: string;
  pgn: string;
}

interface GameStats {
  wins: number;
  losses: number;
  draws: number;
  timeLeft: number;
}

type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

// Material values for pieces
const PIECE_VALUES: Record<string, number> = {
  p: 100,  // pawn
  n: 320,  // knight
  b: 330,  // bishop
  r: 500,  // rook
  q: 900,  // queen
  k: 20000 // king
};

const CENTER_SQUARES = ['d4', 'd5', 'e4', 'e5'];
const KING_SAFETY_ZONES = {
  white: ['f1', 'g1', 'h1', 'f2', 'g2', 'h2'],
  black: ['f8', 'g8', 'h8', 'f7', 'g7', 'h7']
};

const ChessGameViewer: React.FC = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [pgnInput, setPgnInput] = useState('');
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
  const [gameName, setGameName] = useState('');
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const [isPlayingAI, setIsPlayingAI] = useState(false);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [stats, setStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    draws: 0,
    timeLeft: 300 // 5 minutes in seconds
  });
  const [isWhite, setIsWhite] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const aiMoveRef = useRef<number | null>(null);

  const evaluateBoard = (game: Chess): number => {
    let score = 0;
    const board = game.board();

    // Quick material evaluation
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece) {
          score += piece.color === 'w' ? PIECE_VALUES[piece.type] : -PIECE_VALUES[piece.type];
        }
      }
    }

    return score;
  };

  const orderMoves = (game: Chess, moves: string[]): string[] => {
    return moves.sort((a, b) => {
      // Try captures first
      const moveA = game.move(a);
      if (moveA) {
        game.undo();
        const moveB = game.move(b);
        if (moveB) {
          game.undo();
          
          if (moveA.captured && !moveB.captured) return -1;
          if (!moveA.captured && moveB.captured) return 1;
          
          // Then promotions
          if (moveA.promotion && !moveB.promotion) return -1;
          if (!moveA.promotion && moveB.promotion) return 1;
        } else {
          game.undo();
          return -1; // Move B is invalid, prefer move A
        }
      } else {
        game.undo();
        return 1; // Move A is invalid, prefer move B
      }
      
      return 0;
    });
  };

  const minimax = (game: Chess, depth: number, alpha: number, beta: number, maximizingPlayer: boolean): number => {
    if (depth === 0 || game.isGameOver()) {
      return evaluateBoard(game);
    }

    const moves = orderMoves(game, game.moves());

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (const move of moves) {
        game.move(move);
        const evaluation = minimax(game, depth - 1, alpha, beta, false);
        game.undo();
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        game.move(move);
        const evaluation = minimax(game, depth - 1, alpha, beta, true);
        game.undo();
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  };

  const findBestMove = (game: Chess, depth: number): string => {
    const moves = game.moves();
    if (moves.length === 0) return '';
    
    const orderedMoves = orderMoves(game, moves);
    let bestMove = orderedMoves[0];
    let bestScore = -Infinity;

    for (const move of orderedMoves) {
      const moveResult = game.move(move);
      if (moveResult) {
        const score = -minimax(game, depth - 1, -Infinity, Infinity, false);
        game.undo();

        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
    }

    return bestMove;
  };

  useEffect(() => {
    if (isPlayingAI && stats.timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setStats(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlayingAI]);

  useEffect(() => {
    const makeAIMove = () => {
      if (game && !game.isGameOver() && game.turn() === 'b' && isPlayingAI && !isAIThinking) {
        setIsAIThinking(true);
        
        // Clear any pending AI move
        if (aiMoveRef.current) {
          clearTimeout(aiMoveRef.current);
        }

        const depth = difficulty === 'beginner' ? 1 : difficulty === 'intermediate' ? 2 : 3;
        const bestMove = findBestMove(game, depth);
        
        if (bestMove) {
          try {
            const moveResult = game.move(bestMove);
            if (moveResult) {
              // Batch state updates
              setFen(game.fen());
              setHistory(game.history());
            }
          } catch (e) {
            console.error('Invalid move:', e);
          }
        }
        setIsAIThinking(false);
      }
    };

    // Only trigger AI move when it's actually the AI's turn
    if (game?.turn() === 'b' && isPlayingAI && !isAIThinking) {
      aiMoveRef.current = window.setTimeout(makeAIMove, 0);
    }

    return () => {
      if (aiMoveRef.current) {
        clearTimeout(aiMoveRef.current);
      }
    };
  }, [game?.turn(), isPlayingAI, difficulty]);

  const startAIGame = (color: 'white' | 'black') => {
    setIsPlayingAI(true);
    setIsWhite(color === 'white');
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setCurrentMoveIndex(-1);
    setHistory([]);
    setStats(prev => ({ ...prev, timeLeft: 300 }));
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (!isPlayingAI || (isWhite && game.turn() === 'w') || (!isWhite && game.turn() === 'b')) {
      try {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q',
        });

        if (move === null) return false;
        
        // Batch state updates
        setFen(game.fen());
        setCurrentMoveIndex(game.history().length - 1);
        setHistory(game.history());

        if (game.isGameOver()) {
          setIsPlayingAI(false);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          updateStats(game);
        }

        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  const updateStats = (game: Chess) => {
    if (game.isDraw()) {
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else if (game.turn() === 'w') {
      setStats(prev => ({ ...prev, losses: prev.losses + 1 }));
    } else {
      setStats(prev => ({ ...prev, wins: prev.wins + 1 }));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const loadPgn = () => {
    try {
      const cleanPgn = pgnInput
        .replace(/\{.*?\}/g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const newGame = new Chess();
      newGame.loadPgn(cleanPgn);
      setGame(newGame);
      setFen(newGame.fen());
      setCurrentMoveIndex(newGame.history().length - 1);
      setHistory(newGame.history());
    } catch (e) {
      alert('Invalid PGN format. Please make sure the PGN contains valid moves.');
      console.error('PGN loading error:', e);
    }
  };

  const loadSavedGame = (pgn: string) => {
    try {
      const cleanPgn = pgn
        .replace(/\{.*?\}/g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const newGame = new Chess();
      newGame.loadPgn(cleanPgn);
      setGame(newGame);
      setFen(newGame.fen());
      setCurrentMoveIndex(newGame.history().length - 1);
      setHistory(newGame.history());
      setPgnInput(cleanPgn);
    } catch (e) {
      alert('Error loading saved game');
      console.error('Game loading error:', e);
    }
  };

  const goToMove = (index: number) => {
    if (index < -1 || index >= history.length) return;

    const newGame = new Chess();
    for (let i = 0; i <= index; i++) {
      newGame.move(history[i]);
    }
    
    setGame(newGame);
    setFen(newGame.fen());
    setCurrentMoveIndex(index);
  };

  const goToBeginning = () => goToMove(-1);
  const goToEnd = () => goToMove(history.length - 1);
  const goToPreviousMove = () => currentMoveIndex > -1 && goToMove(currentMoveIndex - 1);
  const goToNextMove = () => currentMoveIndex < history.length - 1 && goToMove(currentMoveIndex + 1);

  const saveGame = () => {
    if (!gameName.trim()) {
      alert('Please enter a game name');
      return;
    }
    
    const newSavedGame = {
      name: gameName,
      pgn: game.pgn(),
    };
    
    setSavedGames([...savedGames, newSavedGame]);
    setGameName('');
  };

  const handleDifficultyChange = (newDifficulty: 'beginner' | 'intermediate' | 'advanced') => {
    setDifficulty(newDifficulty);
  };

  return (
    <ChessContainer>
      <MainSection>
        <BoardContainer>
          <Chessboard
            position={fen}
            onPieceDrop={onDrop}
            boardWidth={500}
          />
          <Controls>
            <Button onClick={goToBeginning} disabled={history.length === 0}>
              <FontAwesomeIcon icon={faFastBackward} />
            </Button>
            <Button onClick={goToPreviousMove} disabled={currentMoveIndex <= -1}>
              <FontAwesomeIcon icon={faStepBackward} />
            </Button>
            <Button onClick={goToNextMove} disabled={currentMoveIndex >= history.length - 1}>
              <FontAwesomeIcon icon={faStepForward} />
            </Button>
            <Button onClick={goToEnd} disabled={history.length === 0}>
              <FontAwesomeIcon icon={faFastForward} />
            </Button>
          </Controls>
        </BoardContainer>

        {isPlayingAI && (
          <Timer>
            <FontAwesomeIcon icon={faClock} /> {formatTime(stats.timeLeft)}
          </Timer>
        )}

        <DifficultySelector>
          <DifficultyButton
            isActive={difficulty === 'beginner'}
            onClick={() => handleDifficultyChange('beginner')}
          >
            Beginner
          </DifficultyButton>
          <DifficultyButton
            isActive={difficulty === 'intermediate'}
            onClick={() => handleDifficultyChange('intermediate')}
          >
            Intermediate
          </DifficultyButton>
          <DifficultyButton
            isActive={difficulty === 'advanced'}
            onClick={() => handleDifficultyChange('advanced')}
          >
            Advanced
          </DifficultyButton>
        </DifficultySelector>

        <Controls>
          <Button onClick={() => startAIGame('white')}>
            <FontAwesomeIcon icon={faRobot} /> Play as White
          </Button>
          <Button onClick={() => startAIGame('black')}>
            <FontAwesomeIcon icon={faRobot} /> Play as Black
          </Button>
        </Controls>

        <InputContainer>
          <Input
            type="text"
            placeholder="Enter PGN notation"
            value={pgnInput}
            onChange={(e) => setPgnInput(e.target.value)}
          />
          <Button onClick={loadPgn}>Load PGN</Button>
        </InputContainer>

        <InputContainer>
          <Input
            type="text"
            placeholder="Enter game name to save"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <Button onClick={saveGame}>
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
        </InputContainer>

        <GameStats>
          <StatsTitle>
            <FontAwesomeIcon icon={faTrophy} />
            Game Statistics
          </StatsTitle>
          <StatsGrid>
            <StatItem>
              <StatValue>{stats.wins}</StatValue>
              <StatLabel>Wins</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{stats.losses}</StatValue>
              <StatLabel>Losses</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{stats.draws}</StatValue>
              <StatLabel>Draws</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{((stats.wins / (stats.wins + stats.losses + stats.draws)) * 100 || 0).toFixed(1)}%</StatValue>
              <StatLabel>Win Rate</StatLabel>
            </StatItem>
          </StatsGrid>
        </GameStats>
      </MainSection>

      <SavedGames>
        <SavedGamesTitle>Saved Games</SavedGamesTitle>
        <GameList>
          {savedGames.map((savedGame, index) => (
            <GameItem
              key={index}
              onClick={() => loadSavedGame(savedGame.pgn)}
            >
              {savedGame.name}
            </GameItem>
          ))}
        </GameList>
      </SavedGames>
    </ChessContainer>
  );
};

export default ChessGameViewer; 