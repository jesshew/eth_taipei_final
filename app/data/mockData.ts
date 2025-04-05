export interface User {
  id: string;
  name: string;
  photos: string[];
}

export interface Match {
  id: string;
  matchedUserId: string;
  matchedUser: User;
  matchDate: string;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  isSticker?: boolean;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Jessica",
    photos: ["https://source.unsplash.com/random/400x600/?portrait&woman&1"],
  },
  {
    id: "user2",
    name: "Michael",
    photos: ["https://source.unsplash.com/random/400x600/?portrait&man&1"],
  },
];

// Mock matches
export const mockMatches: Match[] = [
  {
    id: "match1",
    matchedUserId: "user2",
    matchedUser: mockUsers[1],
    matchDate: "2024-03-15",
  },
];

// Mock messages
export const mockMessages: { [key: string]: Message[] } = {
  match1: [
    {
      id: "msg1",
      matchId: "match1",
      senderId: "user1",
      text: "Hey there! 👋",
      timestamp: "2024-03-15T10:00:00Z",
      isRead: true,
    },
    {
      id: "msg2",
      matchId: "match1",
      senderId: "user2",
      text: "Hi! How are you?",
      timestamp: "2024-03-15T10:01:00Z",
      isRead: true,
    },
  ],
};
