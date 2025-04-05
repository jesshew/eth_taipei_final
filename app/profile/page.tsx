"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Camera,
  ChevronRight,
  Crown,
  Edit,
  Edit2,
  MapPin,
  Settings,
} from "lucide-react";
import { NavigationLayout } from "@/components/NavigationLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

// Mock user data - in a real app, this would come from your backend
const user = {
  name: "Jessica",
  age: 28,
  gender: "Female",
  email: "jessica@gmail.com",
  location: "San Francisco, CA",
  bio: "Software engineer by day, amateur photographer by night. Looking for someone to explore the city with! 📸",
  photos: [
    "https://source.unsplash.com/random/400x600/?portrait&woman&1",
    "https://source.unsplash.com/random/400x600/?portrait&woman&2",
    "https://source.unsplash.com/random/400x600/?portrait&woman&3",
  ],
  photoUrl: ["https://source.unsplash.com/random/400x600/?portrait&woman&1"],
  interests: ["Photography", "Hiking", "Coffee", "Travel", "Tech", "Art"],
  isPremium: false,
  prompts: [
    {
      question: "A perfect day includes...",
      answer:
        "Morning coffee at a local cafe, hiking in the Marin Headlands, and ending with sunset photos at Baker Beach.",
    },
    {
      question: "Best travel story",
      answer:
        "Getting lost in Tokyo and stumbling upon the most amazing ramen shop at 2 AM.",
    },
  ],
};

export default function ProfilePage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const router = useRouter();
  
  return (
    <NavigationLayout>
      <div className="h-full p-4 mb-16">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-dating-purple to-dating-pink">
            Profile
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/settings")}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="h-48 rounded-xl overflow-hidden">
            <img
              src={
                user.photos[0] ||
                "https://source.unsplash.com/random/800x600/?landscape"
              }
              alt="Profile background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
              <img
                src={
                  user.photos[0] ||
                  "https://source.unsplash.com/random/300×300/?portrait"
                }
                alt={user.name}
                className="h-full w-full object-cover"
              />
              <button
                className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-2 shadow-md"
                aria-label="Change profile picture"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center mb-6">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl font-bold">
              {user.name}, {user.age}
            </h2>
            {user.isPremium && (
            <Badge className="ml-2 premium-badge text-white">
              <Crown className="h-3 w-3 mr-1" /> Premium
            </Badge>
          )}
          </div>
          <Button
            variant="outline"
            className="mt-2"
            size="sm"
            onClick={() => router.push("/create-profile")}
          >
            <Edit className="h-3 w-3 mr-1" /> Edit Profile
          </Button>
        </div>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Gender
                </h3>
                <p>{user.gender}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Looking for
                </h3>
                {/* <div className="flex flex-wrap gap-2">
                {user.lookingFor.map((preference) => (
                  <Badge key={preference} variant="outline">
                    {preference}
                  </Badge>
                ))}
              </div> */}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Account</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>Email</span>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Account Type</span>
                <span
                  className={
                    user.isPremium
                      ? "text-amber-500 font-medium"
                      : "text-gray-500"
                  }
                >
                  {user.isPremium ? "Premium" : "Basic"}
                </span>
              </div>

              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => router.push("/purchased-features")}
              >
                <span>My Premium Features</span>
                <ChevronRight className="h-4 w-4" />
              </Button>

              {!user.isPremium && (
                <Button
                  className="w-full mt-2 premium-badge text-white"
                  onClick={() => router.push("/premium")}
                >
                  <Crown className="h-4 w-4 mr-2" /> Upgrade to Premium
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        {/* 
      <Button 
        variant="outline" 
        onClick={logout} 
        className="w-full text-gray-700"
      >
        <LogOut className="h-4 w-4 mr-2" /> Sign Out
      </Button> */}
      </div>
    </NavigationLayout>
  );
}
