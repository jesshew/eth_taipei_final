'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { BottomNav } from './BottomNav'

interface MainPageProps {
  children: React.ReactNode
  isVerified: boolean
}

const PROTECTED_ROUTES = ['/swipe', '/matches', '/profile', '/settings']

export function MainPage({ children, isVerified }: MainPageProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If not verified and trying to access protected routes, redirect to verification
    if (!isVerified && PROTECTED_ROUTES.includes(pathname)) {
      router.push('/verify')
      return
    }

    // If verified but on the verify page, redirect to swipe
    if (isVerified && pathname === '/verify') {
      router.push('/swipe')
      return
    }
  }, [isVerified, pathname, router])

  // Don't show bottom nav on verification page
  const showBottomNav = isVerified && pathname !== '/verify'

  return (
    <div className="min-h-screen bg-background pb-16">
      {children}
      {showBottomNav && <BottomNav />}
    </div>
  )
} 