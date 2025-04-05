// Types
export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  photos: string[];
  interests: string[];
  prompts: {
    question: string;
    answer: string;
  }[];
  gender: string;
  lookingFor: string[];
  lastActive: string;
  distance: number;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  matchedUser: Profile;
  createdAt: string;
  lastMessage?: {
    text: string;
    timestamp: string;
    isRead: boolean;
  };
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

// Mock Profiles
export const mockProfiles: Profile[] = [
  {
    id: "profile-1",
    name: "Sam",
    age: 27,
    location: "San Francisco, CA",
    bio: "Coffee enthusiast, amateur photographer, and hiking addict. Looking for someone to share adventures with!",
    photos: [
      "https://img.freepik.com/free-photo/japanese-business-concept-with-business-person_23-2149268032.jpg?t=st=1743829795~exp=1743833395~hmac=84ce7d16e4d9bfb4218186d9f623aa2467a0f90a8be1ca66c736273e2d49fb49&w=826",
      "https://source.unsplash.com/random/600x800/?portrait,woman,1",
      "https://source.unsplash.com/random/600x800/?portrait,woman,2",
    ],
    interests: ["Photography", "Hiking", "Coffee", "Travel"],
    prompts: [
      {
        question: "My most spontaneous moment",
        answer: "Booked a one-way ticket to Thailand and spent 3 months backpacking across Southeast Asia!",
      },
      {
        question: "Dating me is like",
        answer: "Always having someone to try new restaurants with and being dragged on hikes with amazing views.",
      },
    ],
    gender: "woman",
    lookingFor: ["men", "women"],
    lastActive: "5 minutes ago",
    distance: 3,
  },
  {
    id: "profile-2",
    name: "Taylor",
    age: 30,
    location: "Oakland, CA",
    bio: "Software engineer by day, chef by night. Looking for someone to test my recipes and watch bad movies with.",
    photos: [
      "https://img.freepik.com/free-photo/person-cooking-japanese-food_23-2149366815.jpg?t=st=1743833032~exp=1743836632~hmac=411d2532977cb3cb9259a1f2d311470f624ee04bea683c6bea33fa0f0b7a2287&w=826",
      "https://source.unsplash.com/random/600x800/?portrait,person,2",
      "https://source.unsplash.com/random/600x800/?cooking",
    ],
    interests: ["Cooking", "Coding", "Movies", "Board games"],
    prompts: [
      {
        question: "My simple pleasures",
        answer: "A perfect cup of coffee, rainy Sundays with a good book, and successfully debugging code on the first try.",
      },
      {
        question: "I get along best with people who",
        answer: "Are curious, kind, and don't take themselves too seriously.",
      },
    ],
    gender: "non-binary",
    lookingFor: ["men", "women", "non-binary"],
    lastActive: "2 hours ago",
    distance: 5,
  },
  {
    id: "profile-3",
    name: "Chris",
    age: 29,
    location: "San Jose, CA",
    bio: "Music producer and dog dad. Looking for concert buddies and someone to help me name tracks.",
    photos: [
      "https://img.freepik.com/free-photo/side-view-man-playing-guitar-studio_23-2150232124.jpg?t=st=1743833076~exp=1743836676~hmac=d0603c9154abaf519912a2ba51ef4dcfeafb4da80ea413d870dc7a9ac6a7f905&w=826",
      "https://source.unsplash.com/random/600x800/?portrait,man,2",
      "https://source.unsplash.com/random/600x800/?dog",
    ],
    interests: ["Music", "Dogs", "Concerts", "Producing"],
    prompts: [
      {
        question: "My ideal first date",
        answer: "A live show at a small venue followed by late night tacos and great conversation.",
      },
      {
        question: "I'll know it's time to delete this app when",
        answer: "We're arguing over whose playlist we're listening to on our road trip.",
      },
    ],
    gender: "man",
    lookingFor: ["women"],
    lastActive: "1 day ago",
    distance: 15,
  },
  {
    id: "profile-4",
    name: "Morgan",
    age: 26,
    location: "Berkeley, CA",
    bio: "Art teacher who loves rock climbing and poetry. Looking for someone who appreciates both the outdoors and museums.",
    photos: [
      "https://img.freepik.com/free-photo/strong-man-climbing-mountain_23-2149042741.jpg?t=st=1743833160~exp=1743836760~hmac=94b15aa849d97851e0e486b350a10afcbb9afa0a3524eb281aed90ad7b88c210&w=826",
      "https://source.unsplash.com/random/600x800/?climbing",
      "https://source.unsplash.com/random/600x800/?art",
    ],
    interests: ["Art", "Climbing", "Poetry", "Teaching"],
    prompts: [
      {
        question: "A life goal of mine",
        answer: "To open my own art studio where people of all ages can learn and create together.",
      },
      {
        question: "I'm looking for",
        answer: "Someone who wants to build a meaningful connection and isn't afraid of a little adventure.",
      },
    ],
    gender: "woman",
    lookingFor: ["men"],
    lastActive: "3 hours ago",
    distance: 8,
  },
  {
    id: "profile-5",
    name: "Jamie",
    age: 32,
    location: "San Francisco, CA",
    bio: "Tech consultant with a passion for sustainable living and sci-fi novels. Let's talk about the future!",
    photos: [
      "https://img.freepik.com/free-photo/portrait-handsome-young-man-with-arms-crossed-holding-white-headphone-around-his-neck_23-2148096439.jpg?t=st=1743833324~exp=1743836924~hmac=84fe3b8b339620acc36a129779a1547930b697984ea62c4216f2538901cff247&w=826",
      "https://source.unsplash.com/random/600x800/?books",
      "https://source.unsplash.com/random/600x800/?tech",
    ],
    interests: ["Technology", "Reading", "Sustainability", "Futurism"],
    prompts: [
      {
        question: "My most irrational fear",
        answer: "That I'll accidentally like someone's Instagram post from 5 years ago while scrolling through their profile.",
      },
      {
        question: "A non-negotiable",
        answer: "Having separate blankets. Sleep harmony is important!",
      },
    ],
    gender: "non-binary",
    lookingFor: ["men", "women", "non-binary"],
    lastActive: "Just now",
    distance: 2,
  },
];

// Mock Matches
export const mockMatches: Match[] = [
  {
    id: "match-1",
    userId: "user-123",
    matchedUserId: "profile-1",
    matchedUser: mockProfiles[0],
    createdAt: "2025-04-04T14:30:00Z",
    lastMessage: {
      text: "When are we going on that hike you mentioned?",
      timestamp: "2025-04-06T09:12:34Z",
      isRead: true,
    },
  },
  {
    id: "match-2",
    userId: "user-123",
    matchedUserId: "profile-2",
    matchedUser: mockProfiles[1],
    createdAt: "2025-04-04T11:15:00Z",
    lastMessage: {
      text: "I tried that recipe you sent, it was amazing!",
      timestamp: "2025-04-05T18:45:21Z",
      isRead: false,
    },
  },
  {
    id: "match-3",
    userId: "user-123",
    matchedUserId: "profile-3",
    matchedUser: mockProfiles[2],
    createdAt: "2025-04-06T09:45:00Z",
  },
];

// Mock Messages
export const mockMessages: Record<string, Message[]> = {
  "match-1": [
    {
      id: "msg-1-1",
      matchId: "match-1",
      senderId: "user-123",
      text: "Hey Sam! Loved your hiking photos. Any favorite trails nearby?",
      timestamp: "2025-04-04T14:35:00Z",
      isRead: true,
    },
    {
      id: "msg-1-2",
      matchId: "match-1",
      senderId: "profile-1",
      text: "Hi Alex! Yes, I love the Lands End trail - amazing views of the Golden Gate!",
      timestamp: "2025-04-04T14:40:00Z",
      isRead: true,
    },
    {
      id: "msg-1-3",
      matchId: "match-1",
      senderId: "user-123",
      text: "That sounds perfect! I've been wanting to check it out.",
      timestamp: "2025-04-04T14:45:00Z",
      isRead: true,
    },
    {
      id: "msg-1-4",
      matchId: "match-1",
      senderId: "profile-1",
      text: "We should go sometime! The sunset views are incredible.",
      timestamp: "2025-04-04T14:50:00Z",
      isRead: true,
    },
    {
      id: "msg-1-5",
      matchId: "match-1",
      senderId: "user-123",
      text: "I'd love that! Are you free this weekend?",
      timestamp: "2025-04-04T14:55:00Z",
      isRead: true,
    },
    {
      id: "msg-1-6",
      matchId: "match-1",
      senderId: "profile-1",
      text: "Saturday afternoon works for me!",
      timestamp: "2025-04-04T15:00:00Z",
      isRead: true,
    },
    {
      id: "msg-1-7",
      matchId: "match-1",
      senderId: "profile-1",
      text: "When are we going on that hike you mentioned?",
      timestamp: "2025-04-06T09:12:34Z",
      isRead: true,
    },
  ],
  "match-2": [
    {
      id: "msg-2-1",
      matchId: "match-2",
      senderId: "profile-2",
      text: "So, I hear you're into coding too? What languages do you work with?",
      timestamp: "2025-04-04T11:20:00Z",
      isRead: true,
    },
    {
      id: "msg-2-2",
      matchId: "match-2",
      senderId: "user-123",
      text: "Mostly TypeScript and Python these days. How about you?",
      timestamp: "2025-04-04T11:25:00Z",
      isRead: true,
    },
    {
      id: "msg-2-3",
      matchId: "match-2",
      senderId: "profile-2",
      text: "Nice! I'm a full-stack dev, so a bit of everything. But mainly React and Node.",
      timestamp: "2025-04-04T11:30:00Z",
      isRead: true,
    },
    {
      id: "msg-2-4",
      matchId: "match-2",
      senderId: "user-123",
      text: "Cool! I've been getting more into React lately. By the way, you mentioned you like cooking - any recipe recommendations?",
      timestamp: "2025-04-04T11:35:00Z",
      isRead: true,
    },
    {
      id: "msg-2-5",
      matchId: "match-2",
      senderId: "profile-2",
      text: "I make an amazing pasta carbonara - super simple but delicious. I'll send you the recipe!",
      timestamp: "2025-04-04T11:40:00Z",
      isRead: true,
    },
    {
      id: "msg-2-6",
      matchId: "match-2",
      senderId: "user-123",
      text: "I tried that recipe you sent, it was amazing!",
      timestamp: "2025-04-05T18:45:21Z",
      isRead: false,
    },
  ],
};


// Premium Features
export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export const premiumFeatures: PremiumFeature[] = [
  {
    id: "feature-1",
    name: "Super Like",
    description: "Stand out from the crowd with Super Likes that are 3x more likely to get noticed",
    price: 1.99,
    icon: "⭐",
  },
  {
    id: "feature-2",
    name: "Boost",
    description: "Get your profile seen by up to 10x more people for 30 minutes",
    price: 3.99,
    icon: "🚀",
  },
  {
    id: "feature-3",
    name: "Rewind",
    description: "Made a mistake? Go back and swipe again on the last profile",
    price: 0.99,
    icon: "↩️",
  },
  {
    id: "feature-4",
    name: "Incognito Mode",
    description: "Browse profiles without being seen until you like someone",
    price: 4.99,
    icon: "👻",
  },
  {
    id: "feature-5",
    name: "Premium Subscription",
    description: "Unlimited likes, see who likes you, and access all premium features",
    price: 14.99,
    icon: "👑",
  },
];
