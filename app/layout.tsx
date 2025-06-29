import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { MainNavigation } from "@/components/main-navigation"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Project Access - The Ultimate Social & Investment Platform",
  description:
    "Project Access combines the best of social media, investment opportunities, and global partnerships. Connect, create, invest, and collaborate on the world's most advanced platform.",
  keywords:
    "social media, investment, partnerships, collaboration, content creation, networking, business, API management, integration, monitoring, analytics",
  authors: [{ name: "Jemael Xenn", url: "https://projectaccess.co" }],
  creator: "Jemael Xenn",
  publisher: "Project Access",
  openGraph: {
    title: "Project Access - The Ultimate Social & Investment Platform",
    description: "Connect, create, invest, and collaborate on the world's most advanced platform.",
    url: "https://projectaccess.co",
    siteName: "Project Access",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Project Access Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Access",
    description: "The Ultimate Social & Investment Platform",
    creator: "@projectaccess",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://projectaccess.co",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen gradient-bg font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Suspense fallback={<div className="h-16 w-full glass-effect animate-pulse" />}>
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
