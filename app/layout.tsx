import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/contexts/WalletContext";
import { WagmiConfig } from "@/components/providers/WagmiConfig";
import { type Metadata } from "next";
import MiniKitProvider from '@/components/minikit-provider';
import { VerificationProvider } from '@/contexts/verification-context';
import "./globals.css";

export const metadata: Metadata = {
  title: 'Dating App',
  description: 'Find your perfect match',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <WagmiConfig>
          <WalletProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <MiniKitProvider>
                <VerificationProvider>
                  <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
                    <main className="flex-1 overflow-y-auto pb-16">
                      {children}
                    </main>
                  </div>
                </VerificationProvider>
              </MiniKitProvider>
              <Toaster />
            </ThemeProvider>
          </WalletProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
