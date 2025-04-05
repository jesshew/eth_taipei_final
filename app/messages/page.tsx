import Link from "next/link"
import Image from "next/image"

import { matches } from "@/lib/data"
import { NavigationLayout } from '@/components/NavigationLayout'

export default function MessagesPage() {
  return (
    <NavigationLayout>
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
    </NavigationLayout>
  )
}

