"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Profile } from "@/lib/types"

interface ProfileCardProps {
  profile: Profile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [status, setStatus] = useState<"visible" | "swiped">("visible")

  const handleSwipe = (dir: "left" | "right") => {
    setDirection(dir)
    setStatus("swiped")

    // Reset after animation completes
    setTimeout(() => {
      setDirection(null)
      setStatus("visible")
    }, 300)
  }

  return (
    <div className="relative">
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 transform",
          direction === "left" && "translate-x-[-200px] rotate-[-20deg] opacity-0",
          direction === "right" && "translate-x-[200px] rotate-[20deg] opacity-0",
        )}
      >
        <div className="relative h-[500px] w-full">
          <Image src={profile.image || "/placeholder.svg"} alt={profile.name} fill className="object-cover" priority />
        </div>
        <CardContent className="p-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">
                {profile.name}, {profile.age}
              </h3>
              <div className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-muted-foreground">Online</span>
              </div>
            </div>
            <p className="text-muted-foreground">{profile.location}</p>
          </div>
          <div className="mt-4">
            <p>{profile.bio}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <span key={index} className="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-800">
                {interest}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <Button
          size="lg"
          variant="outline"
          className="h-14 w-14 rounded-full bg-white shadow-lg"
          onClick={() => handleSwipe("left")}
        >
          <X className="h-6 w-6 text-red-500" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-14 w-14 rounded-full bg-white shadow-lg"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="h-6 w-6 text-pink-500" />
        </Button>
      </div>
    </div>
  )
}

