import type { Match, Message, Profile, UserProfile } from "./types"

export const profiles: Profile[] = [
  {
    id: "profile1",
    name: "Emma",
    age: 28,
    location: "New York, NY",
    bio: "Coffee enthusiast, book lover, and hiking addict. Looking for someone to share adventures with!",
    interests: ["Travel", "Reading", "Hiking", "Coffee", "Photography"],
    image: "/placeholder.svg?height=500&width=400",
  },
  {
    id: "profile2",
    name: "James",
    age: 31,
    location: "Brooklyn, NY",
    bio: "Musician and foodie. I spend my weekends exploring new restaurants and playing at local venues.",
    interests: ["Music", "Food", "Concerts", "Cooking", "Art"],
    image: "/placeholder.svg?height=500&width=400",
  },
  {
    id: "profile3",
    name: "Sophia",
    age: 26,
    location: "Manhattan, NY",
    bio: "Yoga instructor by day, wine enthusiast by night. Looking for someone to balance my chakras.",
    interests: ["Yoga", "Wine", "Meditation", "Travel", "Fitness"],
    image: "/placeholder.svg?height=500&width=400",
  },
]

export const matches: Match[] = [
  {
    id: "match1",
    name: "Olivia",
    age: 27,
    location: "Manhattan, NY",
    bio: "Art curator with a passion for 90s music and vintage fashion.",
    interests: ["Art", "Music", "Fashion", "Museums", "Concerts"],
    image: "/placeholder.svg?height=200&width=200",
    matchDate: "Matched 2 days ago",
    lastMessage: "Would you like to grab coffee sometime this week?",
    lastMessageTime: "2h ago",
    online: true,
  },
  {
    id: "match2",
    name: "Ethan",
    age: 30,
    location: "Brooklyn, NY",
    bio: "Software engineer who loves rock climbing and craft beer.",
    interests: ["Climbing", "Coding", "Beer", "Hiking", "Travel"],
    image: "/placeholder.svg?height=200&width=200",
    matchDate: "Matched 5 days ago",
    lastMessage: "That climbing gym looks amazing! When are you free?",
    lastMessageTime: "1d ago",
    online: false,
  },
  {
    id: "match3",
    name: "Ava",
    age: 25,
    location: "Queens, NY",
    bio: "Pastry chef and dog lover. Will bake for dates.",
    interests: ["Baking", "Dogs", "Food", "Movies", "Parks"],
    image: "/placeholder.svg?height=200&width=200",
    matchDate: "Matched yesterday",
    lastMessage: "My dog already likes you based on your profile!",
    lastMessageTime: "5h ago",
    online: true,
  },
  {
    id: "match4",
    name: "Noah",
    age: 29,
    location: "Bronx, NY",
    bio: "Teacher by day, amateur comedian by night.",
    interests: ["Comedy", "Education", "Books", "Stand-up", "Writing"],
    image: "/placeholder.svg?height=200&width=200",
    matchDate: "Matched 1 week ago",
    lastMessage: "You should come to my show on Friday!",
    lastMessageTime: "3d ago",
    online: false,
  },
]

export const userProfile: UserProfile = {
  id: "user",
  name: "Alex Johnson",
  age: 28,
  location: "New York, NY",
  bio: "Tech enthusiast and avid traveler. Always planning my next adventure!",
  interests: ["Travel", "Technology", "Photography", "Fitness", "Cooking"],
  interestsRaw: "Travel, Technology, Photography, Fitness, Cooking",
  image: "/placeholder.svg?height=300&width=300",
}

export const messages: Message[] = [
  {
    id: "msg1",
    senderId: "match1",
    text: "Hey there! I noticed we both love art museums. Have you been to the MoMA recently?",
    timestamp: "2023-04-05T14:30:00Z",
  },
  {
    id: "msg2",
    senderId: "user",
    text: "Hi! Yes, I was there last month for the new exhibition. It was amazing!",
    timestamp: "2023-04-05T14:35:00Z",
  },
  {
    id: "msg3",
    senderId: "match1",
    text: "That's awesome! I haven't seen it yet. Would you like to grab coffee sometime this week and tell me about it?",
    timestamp: "2023-04-05T14:40:00Z",
  },
]

export function getMatchById(id: string): Match | undefined {
  return matches.find((match) => match.id === id)
}

