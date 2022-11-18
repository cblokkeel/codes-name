import { BoardCaseKey } from '../enums';

export interface ChatMessage {
  sender: string;
  room: string;
  messageText: string;
}

export interface GameStatus {
  room: string;
  board: Board;
}

export interface Board {
  board: BoardCaseKey[][];
}

export interface BoardCase {
  key: BoardCaseKey;
  word: string;
  discovered: boolean;
}
