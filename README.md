# Chess Game Viewer

A modern, interactive chess game built with React, TypeScript, and chess.js. Play against an AI opponent with adjustable difficulty levels, analyze games, and save your progress.

![Chess Game Screenshot](public/images/chess-game-screenshot.png)

## Features

- 🎮 Play against an AI with three difficulty levels (Beginner, Intermediate, Advanced)
- ⏱️ Game timer to track your progress
- 📊 Game statistics tracking (wins, losses, draws)
- 💾 Save and load games
- 📝 PGN import/export support
- 🎨 Modern, responsive UI with styled components
- ♟️ Interactive chess board with move validation

## Technologies Used

- React
- TypeScript
- chess.js
- styled-components
- Font Awesome icons

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chess-game-viewer.git
cd chess-game-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## How to Play

1. Choose your color (White or Black)
2. Select a difficulty level:
   - Beginner: AI looks 1 move ahead
   - Intermediate: AI looks 2 moves ahead
   - Advanced: AI looks 3 moves ahead
3. Make your moves by dragging pieces
4. Use the navigation controls to review the game
5. Save your game or load a previous one

## Game Controls

- ⏮️ Fast Backward: Go to the beginning of the game
- ⏪ Step Backward: Go to the previous move
- ⏩ Step Forward: Go to the next move
- ⏭️ Fast Forward: Go to the end of the game
- 💾 Save: Save the current game
- 📂 Load: Load a saved game

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- chess.js for the chess logic
- react-chessboard for the chess board component
- Font Awesome for the icons
