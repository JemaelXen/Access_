"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Plus,
  Wallet,
  Filter,
  Download,
  ChevronDown,
} from "lucide-react"

type Transaction = {
  id: string
  type: "in" | "out"
  title: string
  amount: string
  date: string
  source: string
  status: "completed" | "pending" | "failed"
}

export default function WalletPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "in",
      title: "Deposit",
      amount: "+$250.00",
      date: "Today",
      source: "Bank Transfer",
      status: "completed",
    },
    {
      id: "2",
      type: "out",
      title: "Access Coins Purchase",
      amount: "-$50.00",
      date: "Yesterday",
      source: "Credit Card",
      status: "completed",
    },
    {
      id: "3",
      type: "in",
      title: "Refund",
      amount: "+$25.00",
      date: "3 days ago",
      source: "Marketplace",
      status: "completed",
    },
    {
      id: "4",
      type: "out",
      title: "Withdrawal",
      amount: "-$100.00",
      date: "Last week",
      source: "PayPal",
      status: "pending",
    },
    {
      id: "5",
      type: "out",
      title: "VIP Subscription",
      amount: "-$19.99",
      date: "Last month",
      source: "Credit Card",
      status: "completed",
    },
    {
      id: "6",
      type: "in",
      title: "Investment Return",
      amount: "+$120.50",
      date: "Last month",
      source: "Access&Co Shares",
      status: "completed",
    },
  ])

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Please log in to access your wallet.</p>
        <Button className="mt-4" asChild>
          <a href="/login">Log In</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Wallet</h1>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="cards">Cards & Banks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-indigo-200 text-sm">Available Balance</p>
                      <h2 className="text-3xl font-bold">$2,458.30</h2>
                    </div>
                    <Wallet className="h-6 w-6" />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Money
                    </Button>
                    <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Access Coins</p>
                      <h2 className="text-3xl font-bold">12,345</h2>
                    </div>
                    <DollarSign className="h-6 w-6 text-yellow-500" />
                  </div>

                  <div className="flex gap-2">
                    <Button>
                      <Plus className="h-4 w-4 mr-1" />
                      Buy Coins
                    </Button>
                    <Button variant="outline">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      Send Coins
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your recent financial activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 4).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              transaction.type === "in"
                                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                            }`}
                          >
                            {transaction.type === "in" ? (
                              <ArrowDownRight className="h-5 w-5" />
                            ) : (
                              <ArrowUpRight className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{transaction.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {transaction.date} • {transaction.source}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span
                            className={`font-medium ${
                              transaction.type === "in"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {transaction.amount}
                          </span>
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "success"
                                : transaction.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="mt-1"
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("transactions")}>
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-indigo-600" />
                        <div>
                          <h3 className="font-medium">•••• •••• •••• 4242</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/25</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Default</Badge>
                    </div>

                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          P
                        </div>
                        <div>
                          <h3 className="font-medium">PayPal</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Set as Default
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("cards")}>
                    Manage Payment Methods
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <CardTitle>Deposit Funds</CardTitle>
                <CardDescription>Add money to your Access&Co wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input id="amount" type="number" placeholder="0.00" className="pl-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-5 w-5 text-indigo-600" />
                        <span className="font-medium">Credit Card</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Instant deposit with 1.5% fee</p>
                    </div>
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-5 w-5 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          P
                        </div>
                        <span className="font-medium">PayPal</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Instant deposit with 2% fee</p>
                    </div>
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-5 w-5 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          B
                        </div>
                        <span className="font-medium">Bank Transfer</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1-3 business days, no fee</p>
                    </div>
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Plus className="h-5 w-5 text-indigo-600" />
                        <span className="font-medium">Add New</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Connect a new payment method</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Deposit Funds</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="withdraw">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
                <CardDescription>Transfer money from your Access&Co wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input id="withdraw-amount" type="number" placeholder="0.00" className="pl-8" />
                  </div>
                  <p className="text-xs text-gray-500">Available balance: $2,458.30</p>
                </div>

                <div className="space-y-2">
                  <Label>Withdraw To</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-5 w-5 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          B
                        </div>
                        <span className="font-medium">Bank Account</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1-3 business days, no fee</p>
                    </div>
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-5 w-5 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          P
                        </div>
                        <span className="font-medium">PayPal</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Instant, 1% fee</p>
                    </div>
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Plus className="h-5 w-5 text-indigo-600" />
                        <span className="font-medium">Add New</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Connect a new withdrawal method</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Withdraw Funds</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>View all your financial activities</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            transaction.type === "in"
                              ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {transaction.type === "in" ? (
                            <ArrowDownRight className="h-5 w-5" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{transaction.title}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {transaction.date} • {transaction.source}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`font-medium ${
                            transaction.type === "in"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {transaction.amount}
                        </span>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "success"
                              : transaction.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className="mt-1"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">
                  Load More
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="cards">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your cards and bank accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Credit & Debit Cards</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-indigo-600" />
                        <div>
                          <h3 className="font-medium">•••• •••• •••• 4242</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Default</Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New Card
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          P
                        </div>
                        <div>
                          <h3 className="font-medium">PayPal</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Set as Default
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          Disconnect
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          B
                        </div>
                        <div>
                          <h3 className="font-medium">Bank Account</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">•••• 5678</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Set as Default
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Plus className="h-4 w-4 mr-1" />
                    Connect New Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
