"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { SocialFeed } from "@/components/social-feed"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { StoriesBar } from "@/components/stories-bar"
import { QuickActions } from "@/components/quick-actions"
import { useAuth } from "@/contexts/auth-context"

export function HomeContent() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Stories Bar */}
        <ErrorBoundary fallback={<div className="h-24 w-full bg-white/50 rounded-xl mb-6"></div>}>
          <Suspense fallback={<div className="h-24 w-full bg-white/50 rounded-xl mb-6 animate-pulse"></div>}>
            <StoriesBar />
          </Suspense>
        </ErrorBoundary>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Quick Actions */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-20">
              <ErrorBoundary fallback={<div className="p-4 bg-white/50 rounded-xl">Unable to load quick actions</div>}>
                <Suspense fallback={<div className="h-40 w-full bg-white/50 rounded-xl animate-pulse"></div>}>
                  <QuickActions />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>

          {/* Main Content - Social Feed */}
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
            <ErrorBoundary fallback={<div className="p-4 bg-white/50 rounded-xl">Unable to load social feed</div>}>
              <Suspense fallback={<div className="h-96 w-full bg-white/50 rounded-xl animate-pulse"></div>}>
                <SocialFeed />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Right Sidebar - Trending */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-20">
              <ErrorBoundary fallback={<div className="p-4 bg-white/50 rounded-xl">Unable to load trending</div>}>
                <Suspense fallback={<div className="h-40 w-full bg-white/50 rounded-xl animate-pulse"></div>}>
                  <TrendingSidebar />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
