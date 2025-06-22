"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { ArrowRight, ChevronDown, ChevronUp, DollarSign, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type InvestmentTier = {
  id: string
  name: string
  amount: string
  localAmount: string
  shares: string
  benefits: string[]
  progress: number
}

export function InvestmentCard() {
  const { user } = useAuth()
  const [expanded, setExpanded] = useState(false)
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const tiers: InvestmentTier[] = [
    {
      id: "starter",
      name: "Starter Investor",
      amount: "$200",
      localAmount: "₱10,000",
      shares: "0.01%",
      progress: 85,
      benefits: [
        "Investor badge on profile",
        "Voting access on platform decisions",
        "Quarterly financial reports",
        "Early access to new features",
      ],
    },
    {
      id: "pro",
      name: "Pro Investor",
      amount: "$2,000",
      localAmount: "₱100,000",
      shares: "0.1%",
      progress: 72,
      benefits: [
        "Pro badge on profile",
        "Access to exclusive investor group",
        "Monthly financial reports",
        "Priority customer support",
        "Invitation to virtual investor meetings",
      ],
    },
    {
      id: "elite",
      name: "Elite Investor",
      amount: "$20,000",
      localAmount: "₱1,000,000",
      shares: "1%",
      progress: 45,
      benefits: [
        "VVIP badge on profile",
        "Invitation to global events",
        "Revenue share from platform",
        "Direct access to founder",
        "Elite World Access Club membership",
        "Personalized investment dashboard",
      ],
    },
    {
      id: "partner",
      name: "Partner+",
      amount: "$200,000",
      localAmount: "₱10,000,000",
      shares: "10%",
      progress: 15,
      benefits: [
        "Listed on company founders page",
        "All Elite tier privileges",
        "Board member consideration",
        "Strategic partnership opportunities",
        "Co-branding possibilities",
        "Equity stake with voting rights",
      ],
    },
  ]

  // Find the user's tier if they have one
  const userTier = user?.investmentTier ? tiers.find((tier) => tier.id === user.investmentTier) : null

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Invest in Access&Co</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
        {expanded && (
          <CardDescription className="mt-2">
            Become a shareholder in Access&Co and be part of the world's most advanced social platform.
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-4">
        {user?.investmentTier ? (
          <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Badge
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 mr-2"
                >
                  {user.investmentTier.charAt(0).toUpperCase() + user.investmentTier.slice(1)} Investor
                </Badge>
                <Check size={16} className="text-green-500" />
              </div>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {userTier?.shares || "Shares"}
              </span>
            </div>
            <Progress value={100} className="h-2 mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              You are currently a {user.investmentTier.charAt(0).toUpperCase() + user.investmentTier.slice(1)} Investor.
              View your investment dashboard for more details.
            </p>
            <Button variant="link" size="sm" className="p-0 h-auto mt-1">
              View Investment Dashboard
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  selectedTier === tier.id
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{tier.name}</h4>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <DollarSign size={14} />
                    <span>{tier.amount}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {tier.localAmount} · {tier.shares} shares
                </div>

                <Progress value={tier.progress} className="h-1.5 mb-2" />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>{tier.progress}% filled</span>
                  <span>Limited availability</span>
                </div>

                {(expanded || selectedTier === tier.id) && (
                  <div className="mt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Benefits:</div>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check size={12} className="mr-1 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        {!user?.investmentTier && (
          <Button className="w-full" disabled={!selectedTier}>
            <span>Continue to Investment</span>
            <ArrowRight size={16} className="ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
