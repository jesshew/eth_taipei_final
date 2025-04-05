"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Crown,
  EyeOff,
  Heart,
  Star,
  Undo2,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { NavigationLayout } from "@/components/NavigationLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { payWithWorldcoin } from "@/lib/worldcoin";

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
          <h1 className="text-xl font-bold ml-4">Your Premium Features</h1>
        </div>

        <div className="p-4">
          <div className="text-center mb-6">
            <div className="inline-block p-3 rounded-full premium-badge bg-pink-600 mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Premium Features</h2>
            <p className="text-gray-500 mt-1">
              Purchase directly on chain, with World Coin.
            </p>
          </div>

          <Tabs defaultValue="purchase" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="purchase">Subscription</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <Card className="mb-6">
                <CardContent className="p-4">
                  {/* <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Your Features</h3>
                    <Button variant="outline" size="sm" className="text-pink-600" onClick={() => toast({ description: "This feature is not implemented yet :d", variant: "default" })}>
                      Manage Subscription
                    </Button>
                  </div> */}

                  {premiumFeatures.length > 0 ? (
                    <div className="space-y-4">
                      {premiumFeatures.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-start p-3 border rounded-lg"
                        >
                          <div className="bg-pink-100 p-2 rounded-full mr-3">
                            {feature.icon === "Star" && (
                              <Star className="h-5 w-5 text-pink-600" />
                            )}
                            {feature.icon === "Zap" && (
                              <Zap className="h-5 w-5 text-pink-600" />
                            )}
                            {feature.icon === "Undo2" && (
                              <Undo2 className="h-5 w-5 text-pink-600" />
                            )}
                            {feature.icon === "EyeOff" && (
                              <EyeOff className="h-5 w-5 text-pink-600" />
                            )}
                            {feature.icon === "Heart" && (
                              <Heart className="h-5 w-5 text-pink-600" />
                            )}
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
                            <p className="text-sm text-gray-500 mt-1">
                              {feature.description}
                            </p>

                            {feature.remaining && (
                              <div className="mt-2 flex items-center">
                                <span className="text-xs text-gray-500 mr-2">
                                  Remaining: {feature.remaining}
                                </span>
                                {feature.resetsAt && (
                                  <span className="text-xs text-gray-500">
                                    Resets: {feature.resetsAt}
                                  </span>
                                )}
                              </div>
                            )}

                            {feature.unlimited && (
                              <div className="mt-2">
                                <span className="text-xs text-gray-500">
                                  Unlimited usage
                                </span>
                              </div>
                            )}

                            {feature.expiresAt && (
                              <div className="mt-2">
                                <span className="text-xs text-gray-500">
                                  Expires: {feature.expiresAt}
                                </span>
                              </div>
                            )}

                            <div className="mt-3 flex items-center justify-between">
                              {feature.icon === "Zap" && feature.active ? (
                                <Button
                                  size="sm"
                                  className="bg-pink-600 hover:bg-pink-700"
                                >
                                  <Zap className="h-3 w-3 mr-1" /> Use Boost
                                </Button>
                              ) : feature.icon === "Zap" && !feature.active ? (
                                <div className="flex items-center justify-between w-full">
                                  <div className="text-sm font-medium">
                                    $4.99 per boost
                                  </div>
                                  <Button
                                    size="sm"
                                    className="bg-pink-600 hover:bg-pink-700"
                                    onClick={() => router.push("/app/premium")}
                                  >
                                    Buy Now
                                  </Button>
                                </div>
                              ) : feature.icon === "Star" && !feature.active ? (
                                <div className="flex items-center justify-between w-full">
                                  <div className="text-sm font-medium">
                                    $3.99 for 5
                                  </div>
                                  <Button
                                    size="sm"
                                    className="bg-pink-600 hover:bg-pink-700"
                                    onClick={() => router.push("/app/premium")}
                                  >
                                    Buy Now
                                  </Button>
                                </div>
                              ) : !feature.active ? (
                                <div className="flex items-center justify-between w-full">
                                  <div className="text-sm font-medium">
                                    From $4.99/month
                                  </div>
                                  <Button
                                    size="sm"
                                    className="bg-pink-600 hover:bg-pink-700"
                                    onClick={() => router.push("/app/premium")}
                                  >
                                    Subscribe
                                  </Button>
                                </div>
                              ) : null}
                            </div>
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
                      <p className="text-sm text-gray-500 mt-1">
                        You haven't purchased any premium features yet.
                      </p>
                      <div className="mt-4 space-y-3">
                        <div className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">
                              Premium Subscription
                            </h4>
                            <span className="text-sm font-bold">
                              From $4.99/mo
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            Unlock all premium features and enhance your dating
                            experience
                          </p>
                          <Button
                            className="w-full bg-pink-600 hover:bg-pink-700"
                            onClick={() => router.push("/app/premium")}
                          >
                            Upgrade to Premium
                          </Button>
                        </div>

                        <div className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Boosts</h4>
                            <span className="text-sm font-bold">
                              $4.99 each
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            Get more visibility for 30 minutes
                          </p>
                          <Button
                            className="w-full bg-pink-600 hover:bg-pink-700"
                            onClick={() => router.push("/app/premium")}
                          >
                            Buy Boosts
                          </Button>
                        </div>

                        <div className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Super Likes</h4>
                            <span className="text-sm font-bold">
                              $3.99 for 5
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            Stand out from the crowd
                          </p>
                          <Button
                            className="w-full bg-pink-600 hover:bg-pink-700"
                            onClick={() => router.push("/app/premium")}
                          >
                            Buy Super Likes
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchase">
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Subscription Plans</h3>
                  <div className="space-y-4">
                    {[
                      {
                        id: "monthly",
                        name: "Monthly",
                        price: "WLD 7.99/mo",
                        totalPrice: "WLD 7.99 billed monthly",
                        features: "All premium features",
                        popular: false,
                      },
                      {
                        id: "biannual",
                        name: "6 Months",
                        price: "WLD 4.99/mo",
                        totalPrice: "WLD 29.94 billed every 6 months",
                        features: "All premium features + Incognito Mode",
                        popular: true,
                        savings: "Save 30%",
                      },
                      {
                        id: "annual",
                        name: "Yearly",
                        price: "WLD 2.99/mo",
                        totalPrice: "WLD35.88 billed annually",
                        features:
                          "All premium features + Incognito Mode + Priority Support",
                        popular: false,
                        savings: "Save 50%",
                      },
                    ].map((plan) => (
                      <div
                        key={plan.id}
                        className={`p-3 border rounded-lg relative ${
                          plan.popular ? "border-pink-600" : ""
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-bl-lg">
                            Most Popular
                          </div>
                        )}
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium">{plan.name}</h4>
                          <div className="text-right">
                            <div className="font-bold">{plan.price}</div>
                            {plan.totalPrice && (
                              <div className="text-xs text-gray-500">
                                {plan.totalPrice}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {plan.features}
                        </p>
                        {plan.savings && (
                          <div className="mb-2">
                            <span className="text-xs bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full">
                              {plan.savings}
                            </span>
                          </div>
                        )}
                        <Button
                          className="w-full bg-pink-600 hover:bg-pink-700"
                          onClick={() => {
                            const price = parseFloat(
                              plan.totalPrice.match(/[\d,.]+/g)?.[0].replace(/,/g, "") || "0"
                            );
                            const name = plan.name;

                            if (!isNaN(price) && name) {
                              payWithWorldcoin(price, name);
                            } else {
                              console.error(
                                "Selected plan price or name is invalid."
                              );
                            }
                          }}
                        >
                          Subscribe with Worldcoin
                        </Button>
                      </div>
                    ))}
                  </div>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </NavigationLayout>
  );
}
