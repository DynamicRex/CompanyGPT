// src/types/types.ts

export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }
  
  export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    timestamp: Date;
  }
  
  export interface User {
    name: string;
    email: string;
    avatar?: string;
  }
  