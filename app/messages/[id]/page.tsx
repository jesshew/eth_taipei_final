"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getMatchById, messages as initialMessages } from "@/lib/data"
import { NavigationLayout } from '@/components/NavigationLayout'

export default function ChatPage({ params }: { params: { id: string } }) {
  const match = getMatchById(params.id)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !match) return

    const message = {
      id: `msg-${Date.now()}`,
      senderId: "user",
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate reply after 1 second
    setTimeout(() => {
      const reply = {
        id: `msg-${Date.now() + 1}`,
        senderId: match.id,
        text: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, reply])
    }, 1000)
  }

  if (!match) {
    return (
      <NavigationLayout>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-red-500">Match not found</h1>
        </div>
      </NavigationLayout>
    )
  }

  return (
    <NavigationLayout>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <Link href="/messages" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  src={match.image || "/placeholder.svg"}
                  alt={match.name}
                  fill
                  className="rounded-full object-cover"
                />
                {match.online && (
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white"></span>
                )}
              </div>
              <span className="font-medium">{match.name}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="mx-auto max-w-2xl space-y-4">
            {messages.map((message) => {
              const isUser = message.senderId === "user"
              return (
                <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg px-4 py-2 ${isUser ? "bg-pink-500 text-white" : "bg-muted"}`}>
                    <p>{message.text}</p>
                    <p className={`text-right text-xs ${isUser ? "text-pink-100" : "text-muted-foreground"}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
        <footer className="border-t bg-background p-4">
          <form onSubmit={handleSendMessage} className="mx-auto max-w-2xl flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="bg-pink-500 hover:bg-pink-600">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </footer>
      </div>
    </NavigationLayout>
  )
}

