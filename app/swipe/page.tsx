'use client'

import React, { useState, useRef, useEffect, TouchEvent } from "react";
import { ChevronDown, X, Heart, Star, Undo } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockProfiles, Profile } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavigationLayout } from '@/components/NavigationLayout'
import { useRouter } from 'next/navigation'  // Replace the router import


export const SwipePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const router = useRouter();
  // Touch gesture states
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Add new state for mouse tracking
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });

  const currentProfile = mockProfiles[currentIndex];

  const handleSwipe = (liked: boolean) => {
    setDirection(liked ? "right" : "left");
    
    // Simulate 30% chance of match if liked
    const isMatch = liked && Math.random() < 0.6;
    
    setTimeout(() => {
      if (isMatch) {
        setMatchedProfile(currentProfile);
        setShowMatch(true);
      }
      
      // Move to next profile
      setDirection(null);
      if (currentIndex < mockProfiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reset to first profile for demo purposes
        setCurrentIndex(0);
      }
    }, 500);
  };

  const handleSuperLike = () => {
    toast({
      title: "Super Like Used!",
      description: "This is a premium feature. You've used 1 of your 5 daily Super Likes.",
      duration: 3000,
    });
    
    // Higher chance of match with super like
    const isMatch = Math.random() < 0.8;
    
    if (isMatch) {
      setMatchedProfile(currentProfile);
      setShowMatch(true);
    }
    
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleRewind = () => {
    toast({
      title: "Premium Feature",
      description: "Upgrade to Premium to unlock Rewind and go back to the previous profile.",
      duration: 3000,
    });
  };

  // Handle touch start
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
    setIsSwiping(true);
  };

  // Handle touch move
  const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStart.x;
    
    // Limit the drag distance
    const maxOffset = window.innerWidth * 0.4;
    const limitedOffset = Math.max(Math.min(diff, maxOffset), -maxOffset);
    
    setSwipeOffset(limitedOffset);
    setTouchEnd({
      x: currentX,
      y: e.touches[0].clientY
    });
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!isSwiping) return;
    
    setIsSwiping(false);
    const diffX = touchEnd.x - touchStart.x;
    const threshold = window.innerWidth * 0.15; // 15% of screen width
    
    // Reset swipe offset
    setSwipeOffset(0);
    
    // Determine if swipe was significant enough
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe right (like)
        handleSwipe(true);
      } else {
        // Swipe left (dislike)
        handleSwipe(false);
      }
    }
  };

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setIsSwiping(true);
    setMouseStart({
      x: e.clientX,
      y: e.clientY
    });
    setTouchStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    
    const currentX = e.clientX;
    const diff = currentX - mouseStart.x;
    
    // Limit the drag distance
    const maxOffset = window.innerWidth * 0.4;
    const limitedOffset = Math.max(Math.min(diff, maxOffset), -maxOffset);
    
    setSwipeOffset(limitedOffset);
    setTouchEnd({
      x: currentX,
      y: e.clientY
    });
  };

  // Handle mouse up
  const handleMouseUp = () => {
    if (!isMouseDown) return;
    
    setIsMouseDown(false);
    setIsSwiping(false);
    const diffX = touchEnd.x - touchStart.x;
    const threshold = window.innerWidth * 0.15; // 15% of screen width
    
    // Reset swipe offset
    setSwipeOffset(0);
    
    // Determine if swipe was significant enough
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        handleSwipe(true);
      } else {
        handleSwipe(false);
      }
    }
  };

  // Add useEffect to handle mouse up outside the card
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isMouseDown) {
        handleMouseUp();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isMouseDown, touchEnd.x, touchStart.x]);

  return (
    <div className="flex flex-col h-[100vh]">
      {/* Fixed Header */}
      <header className="flex justify-between items-center p-4 bg-white">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dating-purple to-dating-pink">
          Discover
        </h1>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500"
          onClick={() => toast({
            title: "Filters",
            description: "Filter functionality will be available in the next version!",
          })
        }
        disabled={true}
        >
          Filters <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </header>

      {/* Scrollable Profile Card Area */}
      <div className="flex-1 overflow-hidden px-4">
        <div className="h-[80vh]">
          {/* Profile Card */}
          <div 
            ref={cardRef}
            className={`profile-card h-full rounded-xl shadow-lg ${
              direction === "left" 
                ? "animate-swipe-left" 
                : direction === "right" 
                ? "animate-swipe-right" 
                : ""
            }`}
            style={{
              transform: isSwiping ? `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.03}deg)` : '',
              transition: isSwiping ? 'none' : 'transform 0.3s ease',
              cursor: isMouseDown ? 'grabbing' : 'grab'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* Profile Content - Make this section scrollable */}
            <div className="h-full overflow-y-auto">
              {/* Profile Image Section */}
              <div 
                className="relative h-[60vh] min-h-[400px] flex-shrink-0"
                style={{
                  backgroundImage: `url(${currentProfile.photos[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Basic Profile Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
                      <p className="text-sm opacity-90">{currentProfile.location} • {currentProfile.distance} miles away</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSuperLike();
                      }}
                    >
                      <Star className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Scrollable Profile Details Section */}
              <div className="bg-white p-4">
                <p className="text-gray-800 text-lg mb-4">{currentProfile.bio}</p>
                
                <div className="flex flex-wrap gap-2 my-4">
                  {currentProfile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                      {interest}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-4">
                  {currentProfile.prompts.map((prompt, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-gray-700">{prompt.question}</p>
                      <p className="text-gray-600 mt-2">{prompt.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="bg-white px-4 py-2">
        {/* Swipe Instruction (only shown on mobile) */}
        {isMobile && (
          <div className="text-center text-sm text-gray-500 mb-2 animate-pulse">
            Swipe right to like, left to pass
          </div>
        )}
      </div>

      {/* Match Dialog */}
      <Dialog open={showMatch} onOpenChange={setShowMatch}>
        <DialogContent className="bg-gradient-to-br from-dating-purple to-dating-pink text-white border-0 max-w-md rounded-xl animate-match-popup">
          <DialogHeader className="text-center pt-6">
            <div className="flex justify-center">
              <Heart className="h-20 w-20 animate-pulse-heart text-white" />
            </div>
            <DialogTitle className="text-3xl font-bold mt-4">It's a Match!</DialogTitle>
            <DialogDescription className="text-white/90 text-lg">
              You and {matchedProfile?.name} liked each other
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center space-x-4 my-6">
            <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden">
              <img 
                src='https://img.freepik.com/free-photo/beautiful-asian-girl-sitting-cafe-with-cup-coffee-drawing-digital-tablet-with-graphic-pen-d_1258-120146.jpg?t=st=1743866366~exp=1743869966~hmac=a96e953b960fd017d15f0c504601cdc28768467dca108b03a56df187b5045cda&w=826'
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden">
              <img 
                src={matchedProfile?.photos[0]} 
                alt={matchedProfile?.name} 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-2">
            <Button 
              className="flex-1 bg-white hover:bg-gray-100 text-dating-purple"
              onClick={() => setShowMatch(false)}
            >
              Keep Swiping
            </Button>
            <Button 
              className="flex-1 bg-white hover:bg-gray-100 text-dating-purple"
              onClick={() => {
                setShowMatch(false);
                router.push('/matches'); // Navigate to matches page
              }}
            >
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function SwipePageWrapper() {
  return (
    <NavigationLayout>
      <SwipePage />
    </NavigationLayout>
  )
}
