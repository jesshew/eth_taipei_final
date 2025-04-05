'use client'

import { useState } from "react";
import { ArrowLeft, CreditCard, Crown, EyeOff, Heart, Star, Undo2, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { NavigationLayout } from '@/components/NavigationLayout';

export default function PurchasedFeaturesPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [premiumFeatures] = useState([
    {
      id: 1,
      name: "Super Likes",
      description: "5 Super Likes per day",
      icon: "Star",
      remaining: 5,
      resetsAt: "Tomorrow at 12:00 AM",
      active: true,
    },
    {
      id: 2,
      name: "Boosts",
      description: "Get more visibility for 30 minutes",
      icon: "Zap",
      remaining: 2,
      expiresAt: null,
      active: true,
    },
    {
      id: 3,
      name: "Rewinds",
      description: "Go back to profiles you passed",
      icon: "Undo2",
      unlimited: true,
      active: true,
    },
    {
      id: 4,
      name: "Incognito Mode",
      description: "Browse profiles without being seen",
      icon: "EyeOff",
      expiresAt: "May 4, 2025",
      active: true,
    },
    {
      id: 5,
      name: "See Who Likes You",
      description: "View all users who liked your profile",
      icon: "Heart",
      active: true,
    },
  ]);

  return (
    <NavigationLayout>
      <div className="pb-20">
        <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-4">My Premium Features</h1>
        </div>

        <div className="p-4">
          <div className="text-center mb-6">
            <div className="inline-block p-3 rounded-full premium-badge bg-pink-600 mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Your Premium Features</h2>
            <p className="text-gray-500 mt-1">
              Enjoy all your exclusive premium benefits!
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Your Premium Features</h3>
                <Button variant="outline" size="sm" className="text-pink-600" onClick={() => router.push("/premium")}>
                  Manage Subscription
                </Button>
              </div>

              {premiumFeatures.length > 0 ? (
                <div className="space-y-4">
                  {premiumFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-start p-3 border rounded-lg">
                      <div className="bg-pink-100 p-2 rounded-full mr-3">
                        {feature.icon === "Star" && <Star className="h-5 w-5 text-pink-600" />}
                        {feature.icon === "Zap" && <Zap className="h-5 w-5 text-pink-600" />}
                        {feature.icon === "Undo2" && <Undo2 className="h-5 w-5 text-pink-600" />}
                        {feature.icon === "EyeOff" && <EyeOff className="h-5 w-5 text-pink-600" />}
                        {feature.icon === "Heart" && <Heart className="h-5 w-5 text-pink-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{feature.name}</h4>
                          {feature.active ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          ) : (
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{feature.description}</p>

                        {feature.remaining && (
                          <div className="mt-2 flex items-center">
                            <span className="text-xs text-gray-500 mr-2">Remaining: {feature.remaining}</span>
                            {feature.resetsAt && (
                              <span className="text-xs text-gray-500">Resets: {feature.resetsAt}</span>
                            )}
                          </div>
                        )}

                        {feature.unlimited && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">Unlimited usage</span>
                          </div>
                        )}

                        {feature.expiresAt && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">Expires: {feature.expiresAt}</span>
                          </div>
                        )}

                        {feature.icon === "Zap" && (
                          <Button
                            size="sm"
                            className="mt-2 bg-pink-600 hover:bg-pink-700"
                            onClick={() => {
                              toast({
                                title: "Boost Activated",
                                description: "You've used a Boost!",
                              });
                            }}
                          >
                            <Zap className="h-3 w-3 mr-1" /> Use Boost
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="bg-gray-100 inline-flex p-3 rounded-full mb-3">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                  </div>
                  <h4 className="font-medium">No Premium Features</h4>
                  <p className="text-sm text-gray-500 mt-1">You haven't purchased any premium features yet.</p>
                  <Button className="mt-4 bg-pink-600 hover:bg-pink-700">Upgrade to Premium</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Purchase History</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Premium Subscription</h4>
                    <p className="text-xs text-gray-500">Apr 4, 2025</p>
                  </div>
                  <span className="text-sm">$9.99</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">5 Boosts Pack</h4>
                    <p className="text-xs text-gray-500">Mar 28, 2025</p>
                  </div>
                  <span className="text-sm">$14.99</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </NavigationLayout>
  );
}
