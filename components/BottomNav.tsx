'use client'

import { Heart, MessageCircle, User, Settings , Crown} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

const navItems = [
  { path: "/swipe", icon: Heart, label: "Discover" },
  { path: "/chat", icon: MessageCircle, label: "Chat" },
  { path: "/matches", icon: MessageCircle, label: "Matches" },
  { path: "/profile", icon: User, label: "Profile" },
//   { path: "/purchased-features", icon: Crown, label: "Premium" },
  { path: "/settings", icon: Settings, label: "Settings" },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

//   useEffect(() => {
//     // Redirect to /swipe by default if no path is matched
//     if (!navItems.some(item => item.path === pathname)) {
//       router.push('/swipe')
//     }
//   }, [pathname, router])

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-3 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
              pathname === item.path
                ? "text-dating-purple"
                : "text-gray-500 hover:text-gray-900"
            )}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
} 