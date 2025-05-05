import React, { useState, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStepBackward, 
  faStepForward, 
  faFastBackward, 
  faFastForward,
  faSave
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

interface SavedGame {
  name: string;
  pgn: string;
}

const ChessGameViewer: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [pgnInput, setPgnInput] = useState('');
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
  const [gameName, setGameName] = useState('');
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

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
      setMoveHistory(newGame.history());
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
      setMoveHistory(newGame.history());
      setPgnInput(cleanPgn);
    } catch (e) {
      alert('Error loading saved game');
      console.error('Game loading error:', e);
    }
  };

  const goToMove = (index: number) => {
    if (index < -1 || index >= moveHistory.length) return;

    const newGame = new Chess();
    for (let i = 0; i <= index; i++) {
      newGame.move(moveHistory[i]);
    }
    
    setGame(newGame);
    setFen(newGame.fen());
    setCurrentMoveIndex(index);
  };

  const goToBeginning = () => goToMove(-1);
  const goToEnd = () => goToMove(moveHistory.length - 1);
  const goToPreviousMove = () => currentMoveIndex > -1 && goToMove(currentMoveIndex - 1);
  const goToNextMove = () => currentMoveIndex < moveHistory.length - 1 && goToMove(currentMoveIndex + 1);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return false;
      setFen(game.fen());
      setCurrentMoveIndex(game.history().length - 1);
      setMoveHistory(game.history());
      return true;
    } catch (e) {
      return false;
    }
  };

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
            <Button onClick={goToBeginning} disabled={moveHistory.length === 0}>
              <FontAwesomeIcon icon={faFastBackward} />
            </Button>
            <Button onClick={goToPreviousMove} disabled={currentMoveIndex <= -1}>
              <FontAwesomeIcon icon={faStepBackward} />
            </Button>
            <Button onClick={goToNextMove} disabled={currentMoveIndex >= moveHistory.length - 1}>
              <FontAwesomeIcon icon={faStepForward} />
            </Button>
            <Button onClick={goToEnd} disabled={moveHistory.length === 0}>
              <FontAwesomeIcon icon={faFastForward} />
            </Button>
          </Controls>
        </BoardContainer>

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