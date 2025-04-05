import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { matches } from "@/lib/data"

export default function MatchesPage() {
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
          <h1 className="mb-6 text-2xl font-bold">Your Matches</h1>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {matches.map((match) => (
              <Card key={match.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={match.image || "/placeholder.svg"} alt={match.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      {match.name}, {match.age}
                    </h3>
                    <Link href={`/messages/${match.id}`}>
                      <Button size="sm" variant="ghost">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground">{match.matchDate}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

