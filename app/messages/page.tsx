import Link from "next/link"
import Image from "next/image"
import { Heart, MessageCircle, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { matches } from "@/lib/data"

export default function MessagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="font-bold text-xl">DateMe</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/matches">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5 text-pink-500" />
                </Button>
              </Link>
              <Link href="/messages">
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-10">
          <h1 className="mb-6 text-2xl font-bold">Messages</h1>
          <div className="divide-y rounded-md border">
            {matches.map((match) => (
              <Link
                key={match.id}
                href={`/messages/${match.id}`}
                className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={match.image || "/placeholder.svg"}
                    alt={match.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {match.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{match.name}</h3>
                    <span className="text-xs text-muted-foreground">{match.lastMessageTime}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{match.lastMessage}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

