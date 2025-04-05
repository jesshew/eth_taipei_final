"use client";

import { useState } from 'react'
import Image from 'next/image'
import { Camera, Crown, Edit2, MapPin, Settings } from 'lucide-react'
import { NavigationLayout } from '@/components/NavigationLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'  // Replace the router import

// Mock user data - in a real app, this would come from your backend
const userProfile = {
  name: 'Emily',
  age: 28,
  location: 'San Francisco, CA',
  bio: 'Free-spirited yogi and coffee connoisseur seeking a partner in crime to explore the citys hidden gems and beyond! 🧘‍♀️',
  photos: [
    'https://img.freepik.com/free-photo/beautiful-asian-girl-sitting-cafe-with-cup-coffee-drawing-digital-tablet-with-graphic-pen-d_1258-120146.jpg?t=st=1743866366~exp=1743869966~hmac=a96e953b960fd017d15f0c504601cdc28768467dca108b03a56df187b5045cda&w=826',
  ],
  interests: [
    'Yoga',
    'Coffee',
    'Travel',
    'Art',
    'Fashion',
    'Wellness',
  ],
  prompts: [
    {
      question: 'A perfect day includes...',
      answer: 'Morning yoga on the beach, followed by a coffee tasting tour, and ending with a sunset picnic in the park.'
    },
    {
      question: 'Best travel story',
      answer: 'Discovering a secluded waterfall in Hawaii and spending the day swimming and meditating in nature.'
    }
  ],
  email: 'emily@example.com',
  isPremium: true
}

export default function ProfilePage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const router = useRouter()  // Initialize the router hook

  return (
    <NavigationLayout>
      <div className="flex flex-col min-h-screen">
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
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activePhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            variant="ghost"
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white transition-colors"
            onClick={() => {/* TODO: Implement edit profile */}}
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Profile Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">
              {userProfile.name}, {userProfile.age}
            </h1>
            <div className="flex items-center text-white/90">
              <MapPin className="h-4 w-4 mr-2" />
              {userProfile.location}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-8 space-y-6 pb-20">
          {/* Account Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Account</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email</span>
                  <span className="text-gray-900">{userProfile.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Type</span>
                  <span className={userProfile.isPremium ? "text-amber-500 font-medium" : "text-gray-900"}>
                    {userProfile.isPremium ? "Premium" : "Basic"}
                  </span>
                </div>
                <Button 
                  className="w-full mt-2 premium-badge text-white"
                  onClick={() => router.push("/purchased-features")}
                >
                  <Crown className="h-4 w-4 mr-2" /> 
                  View Premium Features
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">About</h2>
                <p className="text-gray-600">{userProfile.bio}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {userProfile.interests.map((interest, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gray-100 text-gray-800 px-3 py-1"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">Prompts</h2>
                <div className="space-y-4">
                  {userProfile.prompts.map((prompt, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900 mb-2">
                        {prompt.question}
                      </p>
                      <p className="text-gray-600">{prompt.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </NavigationLayout>
  );
}
