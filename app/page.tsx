'use client'

import Link from "next/link"
import { Heart, MessageCircle, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProfileCard from "@/components/profile-card"
import { profiles } from "@/lib/data"
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult,tokenToDecimals, Tokens, PayCommandInput} from '@worldcoin/minikit-js'
import { useState } from "react"



export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [appId, setAppId] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);

const sendPayment = async () => {
  const payload: PayCommandInput = {
    reference: "hi-testing",
    to: '0xf54204cd8e7d73d73b2a259c6d9b1450bbdafce0', // Ivy address
    tokens: [
      {
        symbol: Tokens.WLD,
        token_amount: tokenToDecimals(0.002, Tokens.WLD).toString(),
      },
      {
        symbol: Tokens.USDCE,
        token_amount: tokenToDecimals(0.002, Tokens.USDCE).toString(),
      },
    ],
    description: 'Test example payment for minikit',
  }


  const { finalPayload } = await MiniKit.commandsAsync.pay(payload)
  

  if (finalPayload.status == 'success') {
      setIsPaid(true);
      sendHapticFeedbackCommand();
      // Congrats your payment was successful!
    }
  }

  const sendHapticFeedbackCommand = () =>
    console.log('Sending haptic feedback command');
    MiniKit.commands.sendHapticFeedback({
      hapticsType: 'impact',
      style: 'light',
    })

  const sendStrongHapticFeedbackCommand = () => {
    console.log('Sending strong haptic feedback command');
    MiniKit.commands.sendHapticFeedback({
      hapticsType: 'impact',
      style: 'heavy',
    })
  }

  const sendSuccessNotification = () => {
    console.log('Sending success notification');
    MiniKit.commands.sendHapticFeedback({
      hapticsType: 'notification',
      style: 'success',
    })
  }

  const verifyPayload: VerifyCommandInput = {
    action: 'verify-dating', // This is your action ID from the Developer Portal
    signal: '0x12312', // Optional additional data
    verification_level: VerificationLevel.Orb, // Orb | Device
  }
  
  const handleGetAppId = () => {
    const envAppId = process.env.APP_ID;
    if (!envAppId) {
      console.warn('APP_ID not found in environment variables');
      return;
    }
    setAppId(envAppId);
  };

  const handleVerify = async () => {
    if (!MiniKit.isInstalled()) {
      return
    }
    // World App will open a drawer prompting the user to confirm the operation, promise is resolved once user confirms or cancels
    const {finalPayload} = await MiniKit.commandsAsync.verify(verifyPayload)
      if (finalPayload.status === 'error') {
        return console.log('Error payload', finalPayload)
      }
  
      // Verify the proof in the backend
      const verifyResponse = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
        action: 'verify-dating',
        signal: '0x12312', // Optional
      }),
    })
  
    // TODO: Handle Success!
    const verifyResponseJson = await verifyResponse.json()
    if (verifyResponseJson.status === 200) {
      setIsVerified(true);
      sendHapticFeedbackCommand()
      sendSuccessNotification();
      console.log('Verification success!')
    }
  }

  const handleUnverify = () => {
    setIsVerified(false);
    sendStrongHapticFeedbackCommand();
    sendSuccessNotification();

    console.log('User unverified');
  };

  

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
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
              <Button onClick={sendPayment} className="w-full">
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

