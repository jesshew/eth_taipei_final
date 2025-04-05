'use client'

import React, { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Send, Smile, Sticker } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockMatches, mockMessages, Message } from "@/data/mockData"
import { formatDistanceToNow } from "date-fns"
import StickerPicker from "@/components/StickerPicker"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NavigationLayout } from '@/components/NavigationLayout'
import Link from 'next/link'
import { mockUsers } from "@/app/data/mockData"

const user = mockUsers[0]

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const matchId = params.id as string
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showStickerPicker, setShowStickerPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeSticker, setActiveSticker] = useState<string | null>(null)
  const [showerParticles, setShowerParticles] = useState<Array<{ id: number; x: number; y: number; speed: number }>>([])
  
  const match = mockMatches.find((m) => m.id === matchId) || {
    id: matchId,
    matchedUserId: "default-user",
    matchedUser: {
      id: "default-user",
      name: "New Match",
      photos: ["https://source.unsplash.com/random/400x600/?portrait"],
    },
    matchDate: new Date().toISOString(),
  }
  
  useEffect(() => {
    if (matchId && mockMessages[matchId]) {
      setMessages(mockMessages[matchId])
    } else {
      // Initialize with empty messages array if no messages found
      setMessages([])
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [matchId])
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  
  if (!user) {
    router.push("/matches")
    return null
  }
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    const newMsg: Message = {
      id: `msg-new-${Date.now()}`,
      matchId: matchId!,
      senderId: user.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
    }
    
    setMessages([...messages, newMsg])
    setNewMessage("")
    
    // Simulate response after a delay
    setTimeout(() => {
      setIsTyping(true)
      
      setTimeout(() => {
        const responses = [
          "That's interesting! Tell me more.",
          "I was thinking the same thing!",
          "Haha, you're funny 😊",
          "I'd love to talk about that when we meet.",
          "What are your plans this weekend?",
          "I've been wanting to try that place too!",
        ]
        
        const responseMsg: Message = {
          id: `msg-response-${Date.now()}`,
          matchId: matchId!,
          senderId: match.matchedUserId,
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toISOString(),
          isRead: true,
        }
        
        setIsTyping(false)
        setMessages(prev => [...prev, responseMsg])
      }, 3000)
    }, 1000)
  }

  const handleEmojiSelect = (emoji: any) => {
    setNewMessage(prev => prev + emoji.native)
    setShowEmojiPicker(false)
  }

  const handleStickerSelect = (sticker: any) => {
    const newMsg: Message = {
      id: `msg-new-${Date.now()}`,
      matchId: matchId!,
      senderId: user.id,
      text: sticker.image,
      isSticker: true,
      timestamp: new Date().toISOString(),
      isRead: false,
    }
    
    setMessages([...messages, newMsg])
    setShowStickerPicker(false)

    // Simulate response with a sticker
    setTimeout(() => {
      setIsTyping(true)
      
      setTimeout(() => {
        const responseSticker = {
          id: `msg-response-${Date.now()}`,
          matchId: matchId!,
          senderId: match.matchedUserId,
          text: '❤️', // Free heart sticker as response
          isSticker: true,
          timestamp: new Date().toISOString(),
          isRead: true,
        }
        
        setIsTyping(false)
        setMessages(prev => [...prev, responseSticker])
      }, 3000)
    }, 1000)
  }

  const handleStickerClick = (sticker: string) => {
    setActiveSticker(sticker)
    
    // Create rain particles starting from the top
    const particles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50, // Start above the viewport
      speed: Math.random() * 2 + 1, // Random falling speed
    }))
    
    setShowerParticles(particles)
    
    // Clear the shower after 1 second
    setTimeout(() => {
      setActiveSticker(null)
      setShowerParticles([])
    }, 2000)
  }

  // Animation frame for rain effect
  useEffect(() => {
    if (!activeSticker) return

    const animate = () => {
      setShowerParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y + particle.speed,
        }))
      )
    }

    const animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [activeSticker, showerParticles])

  return (
    <NavigationLayout>
      <div className="flex flex-col h-full pb-16">
        {/* Chat header */}
        <div className="px-4 py-3 border-b flex items-center bg-white">
          <Link href="/matches" className="mr-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src={match.matchedUser.photos[0]}
                alt={match.matchedUser.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold">{match.matchedUser.name}</h3>
              <p className="text-xs text-gray-500">
                {Math.random() > 0.7 ? "Online now" : "Last active 2h ago"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 relative">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === user.id
            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 ${
                    isCurrentUser
                      ? "bg-dating-purple text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  {message.isSticker ? (
                    <button
                      onClick={() => handleStickerClick(message.text)}
                      className="text-4xl hover:scale-110 transition-transform duration-200"
                    >
                      {message.text}
                    </button>
                  ) : (
                    <p>{message.text}</p>
                  )}
                  <div
                    className={`text-xs mt-1 ${
                      isCurrentUser ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {formatDistanceToNow(new Date(message.timestamp), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
            )
          })}
          
          {/* Sticker rain animation */}
          {activeSticker && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {showerParticles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute text-2xl"
                  style={{
                    left: `${particle.x}px`,
                    top: `${particle.y}px`,
                    transform: `rotate(${Math.random() * 30 - 15}deg)`,
                    opacity: 1 - (particle.y / window.innerHeight), // Fade out as they fall
                  }}
                >
                  {activeSticker}
                </div>
              ))}
            </div>
          )}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="typing-indicator">
                <div className="typing-indicator-dot"></div>
                <div className="typing-indicator-dot"></div>
                <div className="typing-indicator-dot"></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <form
          onSubmit={handleSendMessage}
          className="border-t p-3 bg-white fixed bottom-20 left-0 right-0 max-w-md mx-auto"
        >
          <div className="flex items-center gap-2">
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="light"
                />
              </PopoverContent>
            </Popover>

            <Popover open={showStickerPicker} onOpenChange={setShowStickerPicker}>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon">
                  <Sticker className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <StickerPicker onSelect={handleStickerSelect} />
              </PopoverContent>
            </Popover>

            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 rounded-full"
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full dating-gradient hover:opacity-90"
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </NavigationLayout>
  )
} 