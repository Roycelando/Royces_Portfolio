declare module 'stockfish' {
  interface StockfishInstance {
    postMessage(message: string): void;
    onmessage: (event: { data: string }) => void;
    terminate(): void;
  }

  const stockfish: () => StockfishInstance;
  export default stockfish;
} 