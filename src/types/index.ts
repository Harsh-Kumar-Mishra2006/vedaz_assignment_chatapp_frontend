//types/index.ts
export interface Message {
  id?: string;
  _id?: string;
  username: string;
  message: string;
  userId: string;
  timestamp: string | Date;
}

export interface User {
  username: string;
  userId: string;
  loginTime?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface SocketContextType {
  socket: any;
  isConnected: boolean;
  sendMessage: (messageData: Message) => void;
}

export interface TypingUser {
  username: string;
  isTyping: boolean;
}