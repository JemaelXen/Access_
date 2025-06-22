"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Crown, Globe, Lock, Users, Check, Calendar, MapPin, ShieldAlert } from "lucide-react"
import Link from "next/link"

type EliteMember = {
  id: string
  name: string
  role: string
  avatar: string
  location: string
  verified: boolean
  joined: string
}

type EliteEvent = {
  id: string
  title: string
  date: string
  location: string
  type: string
  status: "upcoming" | "ongoing" | "past"
  exclusive: boolean
}

export default function ElitePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const eliteMembers: EliteMember[] = [
    {
      id: "1",
      name: "Jemael Xenn",
      role: "Founder",
      avatar: "A",
      location: "Philippines",
      verified: true,
      joined: "January 2023",
    },
    {
      id: "2",
      name: "Elizabeth Taylor",
      role: "Celebrity",
      avatar: "E",
      location: "United States",
      verified: true,
      joined: "March 2023",
    },
    {
      id: "3",
      name: "Richard Chen",
      role: "Business Leader",
      avatar: "R",
      location: "Singapore",
      verified: true,
      joined: "April 2023",
    },
    {
      id: "4",
      name: "Sophia Martinez",
      role: "Diplomat",
      avatar: "S",
      location: "Spain",
      verified: true,
      joined: "May 2023",
    },
    {
      id: "5",
      name: "Ahmed Al-Farsi",
      role: "Royal Family",
      avatar: "A",
      location: "UAE",
      verified: true,
      joined: "June 2023",
    },
    {
      id: "6",
      name: "Victoria Wellington",
      role: "Politician",
      avatar: "V",
      location: "United Kingdom",
      verified: true,
      joined: "July 2023",
    },
  ]

  const eliteEvents: EliteEvent[] = [
    {
      id: "1",
      title: "World Economic Forum",
      date: "Jan 15-19, 2024",
      location: "Davos, Switzerland",
      type: "Business & Economic",
      status: "upcoming",
      exclusive: true,
    },
    {
      id: "2",
      title: "United Nations General Assembly",
      date: "Sep 19-23, 2024",
      location: "New York, USA",
      type: "Diplomatic",
      status: "upcoming",
      exclusive: false,
    },
    {
      id: "3",
      title: "G20 Summit",
      date: "Nov 18-19, 2024",
      location: "Rio de Janeiro, Brazil",
      type: "Diplomatic",
      status: "upcoming",
      exclusive: true,
    },
    {
      id: "4",
      title: "Paris Fashion Week",
      date: "Sep 23-Oct 1, 2024",
      location: "Paris, France",
      type: "Fashion & Culture",
      status: "upcoming",
      exclusive: false,
    },
    {
      id: "5",
      title: "Access&Co Elite Gala",
      date: "Dec 10, 2024",
      location: "Tokyo, Japan",
      type: "Networking",
      status: "upcoming",
      exclusive: true,
    },
  ]

  // Safely check if user is an elite member
  const isEliteMember = user?.role === "elite" || user?.role === "admin"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Crown className="h-8 w-8 text-amber-500" />
          <h1 className="text-3xl font-bold">Elite World Access Club</h1>
        </div>

        {!user ? (
          // Not logged in
          <Card>
            <CardHeader>
              <CardTitle>Exclusive Access Required</CardTitle>
              <CardDescription>Please log in to access the Elite World Access Club</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Lock className="h-16 w-16 text-gray-400 mb-4" />
              <p className="mb-6 max-w-md">
                The Elite World Access Club is an exclusive area for world leaders, celebrities, and high-net-worth
                individuals. Please log in to continue.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : !isEliteMember ? (
          // Logged in but not an elite member
          <Card>
            <CardHeader>
              <CardTitle>Elite Membership Required</CardTitle>
              <CardDescription>You need elite membership to access this exclusive area</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <ShieldAlert className="h-16 w-16 text-amber-500 mb-4" />
              <p className="mb-6 max-w-md">
                The Elite World Access Club is an exclusive area for world leaders, celebrities, and high-net-worth
                individuals. Upgrade your membership to gain access to exclusive events, networking opportunities, and
                more.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/invest">Upgrade Membership</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Elite member view
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="forums">Private Forums</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome, {user?.name}</CardTitle>
                    <CardDescription>You are a valued member of the Elite World Access Club</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback>{user?.avatar || "?"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold">{user?.name}</h2>
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          >
                            Elite Member
                          </Badge>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">Member since {user?.joinDate}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>Access to exclusive events and gatherings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>Private networking with world leaders</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>Invitation to global summits and conferences</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>Exclusive content and investment opportunities</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Membership Details
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Elite Events</CardTitle>
                    <CardDescription>Exclusive gatherings for Elite members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {eliteEvents
                        .filter((event) => event.exclusive)
                        .slice(0, 3)
                        .map((event) => (
                          <div key={event.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{event.title}</h3>
                              <Badge
                                variant="secondary"
                                className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
                              >
                                {event.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("events")}>
                      View All Events
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Elite Members</CardTitle>
                    <CardDescription>Connect with other distinguished members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {eliteMembers.map((member) => (
                        <div key={member.id} className="flex flex-col items-center text-center">
                          <Avatar className="h-16 w-16 mb-2">
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-1">
                            <h3 className="font-medium text-sm">{member.name}</h3>
                            {member.verified && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3 w-3 text-blue-500"
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                              </svg>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("members")}>
                      View All Members
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle>Elite Club Members</CardTitle>
                  <CardDescription>
                    Connect with world leaders, celebrities, and high-profile individuals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {eliteMembers.map((member) => (
                      <div key={member.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar>
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1">
                              <h3 className="font-medium">{member.name}</h3>
                              {member.verified && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-3 w-3 text-blue-500"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                  <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <MapPin className="h-4 w-4" />
                          <span>{member.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {member.joined}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Elite Events</CardTitle>
                  <CardDescription>Exclusive gatherings and networking opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {eliteEvents.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-lg">{event.title}</h3>
                              {event.exclusive && (
                                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                  Elite Exclusive
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <Badge variant="secondary" className="mt-2">
                              {event.type}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button>RSVP</Button>
                            <Button variant="outline">Add to Calendar</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forums">
              <Card>
                <CardHeader>
                  <CardTitle>Private Forums</CardTitle>
                  <CardDescription>Exclusive discussions only available to Elite members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Global Economic Trends</h3>
                        <Badge>42 discussions</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Discuss the latest economic trends and their impact on global markets.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Last activity: 2 hours ago</span>
                        <span>•</span>
                        <span>128 members</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Diplomatic Relations</h3>
                        <Badge>37 discussions</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Private forum for diplomatic discussions and international relations.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Last activity: 5 hours ago</span>
                        <span>•</span>
                        <span>94 members</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Exclusive Investment Opportunities</h3>
                        <Badge>28 discussions</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Discover and discuss high-value investment opportunities only available to Elite members.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Last activity: 1 day ago</span>
                        <span>•</span>
                        <span>156 members</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Cultural Exchange</h3>
                        <Badge>19 discussions</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Share and discuss cultural insights and experiences from around the world.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Last activity: 3 days ago</span>
                        <span>•</span>
                        <span>87 members</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Create New Discussion</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="benefits">
              <Card>
                <CardHeader>
                  <CardTitle>Elite Membership Benefits</CardTitle>
                  <CardDescription>Exclusive privileges for Elite World Access Club members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                          <Users className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium">Exclusive Networking</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Connect directly with world leaders, celebrities, politicians, and high-net-worth individuals.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Private messaging with other Elite members</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Invitation to exclusive networking events</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Access to private forums and discussions</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                          <Globe className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium">Global Events</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Gain access to the world's most prestigious events and gatherings.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>VIP invitations to global summits</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Priority access to sold-out events</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Exclusive Access&Co Elite Galas</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                          <Lock className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium">Private Content</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Access exclusive content and information not available to regular users.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Elite-only feed and discussions</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Early access to platform features</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Exclusive investment opportunities</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
