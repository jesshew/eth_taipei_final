'use client'

import { useVerification } from '@/contexts/verification-context'
import { BottomNav } from './BottomNav'

export function NavigationLayout({ children }: { children: React.ReactNode }) {
  const { isVerified } = useVerification()

  return (
    <>
      {children}
      {isVerified && <BottomNav />}
    </>
  )
} 