export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  participants: number;
  maxParticipants: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  roomId: string;
}