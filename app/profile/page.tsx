 'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Camera, Edit2, MapPin, Settings } from 'lucide-react'
import { NavigationLayout } from '@/components/NavigationLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Mock user data - in a real app, this would come from your backend
const userProfile = {
  name: 'Jessica',
  age: 28,
  location: 'San Francisco, CA',
  bio: 'Software engineer by day, amateur photographer by night. Looking for someone to explore the city with! 📸',
  photos: [
    'https://source.unsplash.com/random/400x600/?portrait&woman&1',
    'https://source.unsplash.com/random/400x600/?portrait&woman&2',
    'https://source.unsplash.com/random/400x600/?portrait&woman&3',
  ],
  interests: [
    'Photography',
    'Hiking',
    'Coffee',
    'Travel',
    'Tech',
    'Art',
  ],
  prompts: [
    {
      question: 'A perfect day includes...',
      answer: 'Morning coffee at a local cafe, hiking in the Marin Headlands, and ending with sunset photos at Baker Beach.'
    },
    {
      question: 'Best travel story',
      answer: 'Getting lost in Tokyo and stumbling upon the most amazing ramen shop at 2 AM.'
    }
  ]
}

export default function ProfilePage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  return (
    <NavigationLayout>
      <div className="flex flex-col min-h-screen pb-20">
        {/* Profile Header */}
        <div className="relative h-[70vh] min-h-[500px]">
          <Image
            src={userProfile.photos[activePhotoIndex]}
            alt={`${userProfile.name}'s photo`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Photo Navigation Dots */}
          <div className="absolute top-4 left-0 right-0">
            <div className="flex justify-center gap-2">
              {userProfile.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePhotoIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === activePhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
            onClick={() => {/* TODO: Implement edit profile */}}
          >
            <Edit2 className="h-5 w-5" />
          </Button>

          {/* Profile Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">
              {userProfile.name}, {userProfile.age}
            </h1>
            <p className="flex items-center text-white/90 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              {userProfile.location}
            </p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Bio Section */}
          <section>
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-600">{userProfile.bio}</p>
          </section>

          {/* Interests Section */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-800"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </section>

          {/* Prompts Section */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Prompts</h2>
            <div className="space-y-4">
              {userProfile.prompts.map((prompt, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-bold text-gray-700 mb-2">
                    {prompt.question}
                  </p>
                  <p className="text-gray-600">{prompt.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Profile Actions */}
          <section className="pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {/* TODO: Implement edit photos */}}
            >
              <Camera className="h-4 w-4 mr-2" />
              Update Photos
            </Button>
          </section>
        </div>
      </div>
    </NavigationLayout>
  )
}