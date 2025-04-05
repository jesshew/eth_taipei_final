'use client'

import Link from "next/link"
import { Heart, MessageCircle, User } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import ProfileCard from "@/components/profile-card"
import { profiles } from "@/lib/data"
import { SwipePage } from "@/components/SwipePage"
import { 
  sendPayment, 
  verifyUser, 
  getAppId, 
  sendHapticFeedback, 
  sendStrongHapticFeedback, 
  sendSuccessNotification 
} from "@/lib/worldcoin"
import VerifyHumanity from "@/components/VerifyHumanity"

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [appId, setAppId] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = async () => {
    const success = await sendPayment();
    if (success) {
      setIsPaid(true);
      sendHapticFeedback();
    }
  }

  const handleGetAppId = () => {
    const id = getAppId();
    setAppId(id);
  };

  const handleVerify = async () => {
    const result = await verifyUser();
    if (result.isSuccess) {
      setIsVerified(true);
      sendHapticFeedback();
      console.log('Verification success!');
    }
  }

  const handleUnverify = () => {
    setIsVerified(false);
    sendStrongHapticFeedback();
    console.log('User unverified');
  };

  const handleVerificationSuccess = () => {
    // Handle successful verification
    // For example, redirect to the next step or update user state
    sendHapticFeedback();
    console.log('Verification successful');
  };

  const handleVerificationError = (error: string) => {
    // Handle verification error
    sendStrongHapticFeedback();
    console.error('Verification failed:', error);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            {/* <SwipePage /> */}
            <VerifyHumanity 
              onVerificationSuccess={handleVerificationSuccess}
              onVerificationError={handleVerificationError}
            />
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="font-bold text-xl">DateMe</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/matches">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5 text-pink-500" />
                </Button>
              </Link>
              <Link href="/messages">
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-10 md:py-12 lg:py-16">
          <div className="mx-auto max-w-md">
            <ProfileCard profile={profiles[0]} />
            <div className="space-y-2">
              <Button onClick={() => { if (!isVerified) handleVerify(); }}>
                {isVerified ? "Verified" : "Verify"}
              </Button>
              <Button onClick={handleUnverify} className="w-full">
                Unverify
              </Button>
              <Button onClick={handleGetAppId} className="w-full">
                Get App ID
              </Button>
              <Button onClick={handlePayment} className="w-full">
                Send Payment
              </Button>
              {appId && (
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <p className="text-sm">App ID: {appId}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

