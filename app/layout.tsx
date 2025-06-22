import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { MainNavigation } from "@/components/main-navigation"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Project Access - The Ultimate Social & Investment Platform",
  description:
    "Project Access combines the best of social media, investment opportunities, and global partnerships. Connect, create, invest, and collaborate on the world's most advanced platform.",
  keywords: "social media, investment, partnerships, collaboration, content creation, networking, business",
  authors: [{ name: "Jemael Xenn", url: "https://projectaccess.co" }],
  creator: "Jemael Xenn",
  publisher: "Project Access",
  openGraph: {
    title: "Project Access - The Ultimate Social & Investment Platform",
    description: "Connect, create, invest, and collaborate on the world's most advanced platform.",
    url: "https://projectaccess.co",
    siteName: "Project Access",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Access",
    description: "The Ultimate Social & Investment Platform",
    creator: "@projectaccess",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Suspense fallback={<div className="h-16 w-full bg-white/80 backdrop-blur-sm"></div>}>
                <MainNavigation />
              </Suspense>
              <main className="flex-1 pt-16">{children}</main>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
