"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import dynamic from "next/dynamic"

// Dynamically import components with no SSR to avoid hydration issues
const DynamicSocialFeed = dynamic(
  () => import("@/components/social-feed").then((mod) => ({ default: mod.SocialFeed })),
  {
    ssr: false,
    loading: () => <div className="h-40 w-full bg-gray-100 animate-pulse rounded-lg"></div>,
  },
)

const DynamicTrendingSidebar = dynamic(
  () => import("@/components/trending-sidebar").then((mod) => ({ default: mod.TrendingSidebar })),
  {
    ssr: false,
    loading: () => <div className="h-20 w-full bg-gray-100 animate-pulse rounded-lg"></div>,
  },
)

const DynamicCompanyProfile = dynamic(
  () => import("@/components/company-profile").then((mod) => ({ default: mod.CompanyProfile })),
  {
    ssr: false,
    loading: () => <div className="h-20 w-full bg-gray-100 animate-pulse rounded-lg"></div>,
  },
)

export function HomeContent() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden lg:block lg:w-1/4">
          <ErrorBoundary fallback={<div className="p-4 border rounded-lg">Unable to load company profile</div>}>
            <Suspense fallback={<div className="h-20 w-full bg-gray-100 animate-pulse rounded-lg"></div>}>
              <DynamicCompanyProfile />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="flex-1">
          <ErrorBoundary fallback={<div className="p-4 border rounded-lg">Unable to load social feed</div>}>
            <Suspense fallback={<div className="h-40 w-full bg-gray-100 animate-pulse rounded-lg"></div>}>
              <DynamicSocialFeed />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="hidden lg:block lg:w-1/4">
          <ErrorBoundary fallback={<div className="p-4 border rounded-lg">Unable to load trending sidebar</div>}>
            <Suspense fallback={<div className="h-20 w-full bg-gray-100 animate-pulse rounded-lg"></div>}>
              <DynamicTrendingSidebar />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
