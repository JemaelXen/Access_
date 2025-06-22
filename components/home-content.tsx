"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { SocialFeed } from "@/components/social-feed"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { CompanyProfile } from "@/components/company-profile"

export function HomeContent() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden lg:block lg:w-1/4">
          <ErrorBoundary fallback={<div className="p-4 border rounded-lg">Unable to load company profile</div>}>
            <Suspense fallback={<div className="h-20 w-full bg-gray-100 animate-pulse rounded-lg"></div>}>
              <CompanyProfile />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="flex-1">
          <ErrorBoundary fallback={<div className="p-4 border rounded-lg">Unable to load social feed</div>}>
            <Suspense fallback={<div className="h-40 w-full bg-gray-100 animate-pulse rounded-lg"></div>}>
              <SocialFeed />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="hidden lg:block lg:w-1/4">
          <ErrorBoundary fallback={<div className="p-4 border rounded-lg">Unable to load trending sidebar</div>}>
            <Suspense fallback={<div className="h-20 w-full bg-gray-100 animate-pulse rounded-lg"></div>}>
              <TrendingSidebar />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
