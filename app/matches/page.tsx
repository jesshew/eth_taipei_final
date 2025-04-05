import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { matches } from "@/lib/data"
import { NavigationLayout } from '@/components/NavigationLayout'

export default function MatchesPage() {
  return (
    <NavigationLayout>
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
    </NavigationLayout>
  )
}

