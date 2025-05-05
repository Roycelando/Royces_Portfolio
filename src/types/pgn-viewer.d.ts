declare module '@mliebelt/pgn-viewer' {
  export class Stockfish {
    constructor();
    onmessage: ((msg: string) => void) | null;
    postMessage(msg: string): void;
    terminate(): void;
  }
} 