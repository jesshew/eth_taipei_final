export interface Profile {
  id: string
  name: string
  age: number
  location: string
  bio: string
  interests: string[]
  image: string
}

export interface Match extends Profile {
  matchDate: string
  lastMessage: string
  lastMessageTime: string
  online: boolean
}

export interface UserProfile extends Profile {
  interestsRaw: string
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
}

