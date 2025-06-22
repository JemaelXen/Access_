import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { MainNavigation } from "@/components/main-navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SplashScreen } from "@/components/splash-screen"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Access&Co - The All-In-One Intelligent Global Platform",
  description:
    "Connect, invest, and grow with Access&Co - the revolutionary platform that combines social networking, investment opportunities, and global business partnerships.",
  keywords: "social media, investment, business partnerships, elite access, global platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-950`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Suspense fallback={null}>
              <SplashScreen />
            </Suspense>
            <div className="flex flex-col min-h-screen">
              <Suspense fallback={<div className="h-16 w-full bg-white"></div>}>
                <MainNavigation />
              </Suspense>
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
