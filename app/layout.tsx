import type { Metadata } from 'next'
import MiniKitProvider from '@/components/minikit-provider'
import { BottomNav } from "@/components/BottomNav"
import "./globals.css"

export const metadata: Metadata = {
  title: 'Dating App',
  description: 'Find your perfect match',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <MiniKitProvider>
        <body>
          <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
            <main className="flex-1 overflow-y-auto pb-16">
              {children}
            </main>
            {/* <BottomNav /> */}
          </div>
        </body>
      </MiniKitProvider>
    </html>
  )
}
