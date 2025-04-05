'use client'

import { useVerification } from '@/contexts/verification-context'
import { BottomNav } from './BottomNav'

export function NavigationLayout({ children }: { children: React.ReactNode }) {
  const { isVerified } = useVerification()

  return (
    <div className="relative flex flex-col min-h-screen max-w-md mx-auto bg-white">
      <div className="flex-1">
        {children}
      </div>
      {isVerified && <BottomNav />}
    </div>
  )
} 