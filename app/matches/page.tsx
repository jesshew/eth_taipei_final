"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge, Heart, MessageCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { matches } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { mockMatches } from "@/data/mockData";
import { NavigationLayout } from "@/components/NavigationLayout";

export default function MatchesPage() {
  const router = useRouter();
  const sortedMatches = [...mockMatches].sort((a, b) => {
    // First prioritize matches with messages
    if (a.lastMessage && !b.lastMessage) return -1;
    if (!a.lastMessage && b.lastMessage) return 1;

    // Then sort by most recent message or match date
    const aDate = a.lastMessage
      ? new Date(a.lastMessage.timestamp)
      : new Date(a.createdAt);
    const bDate = b.lastMessage
      ? new Date(b.lastMessage.timestamp)
      : new Date(b.createdAt);
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <NavigationLayout>
      <div className="h-full p-4">
        <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-dating-purple to-dating-pink">
          Your Matches
        </h1>

        <div className="space-y-1">
          {sortedMatches.map((match) => (
            <div
              key={match.id}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => router.push(`/chat/${match.id}`)}
            >
              <div className="relative">
                <div className="h-14 w-14 rounded-full overflow-hidden">
                  <img
                    src={match.matchedUser.photos[0]}
                    alt={match.matchedUser.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {match.lastMessage && !match.lastMessage.isRead && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-dating-pink rounded-full border-2 border-white"></div>
                )}
              </div>

              <div className="ml-3 flex-1 border-b border-gray-100 pb-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">
                    {match.matchedUser.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {match.lastMessage
                      ? formatDistanceToNow(
                          new Date(match.lastMessage.timestamp),
                          { addSuffix: true }
                        ).replace('in ', '')
                      : formatDistanceToNow(new Date(match.createdAt), {
                          addSuffix: true,
                        }).replace('in ', '')}
                  </span>
                </div>

                <div className="flex justify-between mt-1">
                  <p className="text-sm text-gray-500 truncate max-w-[200px]">
                    {match.lastMessage
                      ? match.lastMessage.text
                      : "New match! Say hello 👋"}
                  </p>

                  {/* {!match.lastMessage && (
                  <Badge
                    variant="outline"
                    className="text-xs dating-gradient text-white"
                  >
                    New
                  </Badge>
                )} */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedMatches.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold text-gray-600">
              No matches yet
            </h3>
            <p className="text-gray-500 mt-2">
              Keep swiping to find your perfect match!
            </p>
          </div>
        )}
      </div>
    </NavigationLayout>
  );
}
