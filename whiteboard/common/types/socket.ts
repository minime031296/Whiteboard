export interface CtxOptions {
    lineColor: string;
    lineWidth: number;
  }
  
  export interface ClientToServerEvents {
    draw: (moves: [number, number][], options: CtxOptions) => void;
  }
  
  export interface ServerToClientEvents {
    socket_draw: (moves: [number, number][], options: CtxOptions) => void;
  }
  