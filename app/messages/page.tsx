"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Phone, Video, Info, ImageIcon, Smile, Send, ChevronLeft } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"

type Contact = {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  typing?: boolean
}

type Message = {
  id: string
  senderId: string
  text: string
  time: string
  status: "sent" | "delivered" | "read"
  isMe: boolean
}

function MessagesContent() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeContact, setActiveContact] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Jemael Xenn",
      avatar: "A",
      lastMessage: "Let's discuss the new investment feature",
      time: "2m ago",
      unread: 3,
      online: true,
      typing: true,
    },
    {
      id: "2",
      name: "Global Tech News",
      avatar: "G",
      lastMessage: "We'd like to feature Access&Co in our next article",
      time: "1h ago",
      unread: 0,
      online: true,
    },
    {
      id: "3",
      name: "Investment Daily",
      avatar: "I",
      lastMessage: "Can you provide more details about the investment opportunities?",
      time: "3h ago",
      unread: 0,
      online: false,
    },
    {
      id: "4",
      name: "Elite Club",
      avatar: "E",
      lastMessage: "Your application for Elite World Access Club has been approved",
      time: "1d ago",
      unread: 0,
      online: true,
    },
    {
      id: "5",
      name: "Support Team",
      avatar: "S",
      lastMessage: "How can we help you today?",
      time: "2d ago",
      unread: 0,
      online: true,
    },
  ])

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1",
        senderId: "1",
        text: "Hi there! How's the platform development going?",
        time: "10:30 AM",
        status: "read",
        isMe: false,
      },
      {
        id: "2",
        senderId: user?.id || "user",
        text: "It's going great! We're making significant progress on the investment features.",
        time: "10:32 AM",
        status: "read",
        isMe: true,
      },
      {
        id: "3",
        senderId: "1",
        text: "That's fantastic! I'm excited to see the new features in action.",
        time: "10:33 AM",
        status: "read",
        isMe: false,
      },
      {
        id: "4",
        senderId: "1",
        text: "Let's discuss the new investment feature in more detail. I have some ideas that could enhance the user experience.",
        time: "10:35 AM",
        status: "read",
        isMe: false,
      },
    ],
    "2": [
      {
        id: "1",
        senderId: "2",
        text: "Hello! We're interested in featuring Access&Co in our next article about innovative social platforms.",
        time: "9:15 AM",
        status: "read",
        isMe: false,
      },
      {
        id: "2",
        senderId: user?.id || "user",
        text: "Thank you for your interest! We'd be happy to provide more information about Access&Co for your article.",
        time: "9:20 AM",
        status: "read",
        isMe: true,
      },
      {
        id: "3",
        senderId: "2",
        text: "Great! Could you share some details about what makes Access&Co unique in the social media landscape?",
        time: "9:22 AM",
        status: "read",
        isMe: false,
      },
    ],
    "3": [
      {
        id: "1",
        senderId: "3",
        text: "Hello, I'm interested in learning more about the investment opportunities on Access&Co.",
        time: "Yesterday",
        status: "read",
        isMe: false,
      },
      {
        id: "2",
        senderId: user?.id || "user",
        text: "Hi there! We offer various investment tiers starting from $200. Would you like me to explain the different options?",
        time: "Yesterday",
        status: "read",
        isMe: true,
      },
      {
        id: "3",
        senderId: "3",
        text: "Yes, please. Can you provide more details about the benefits of each tier?",
        time: "Yesterday",
        status: "read",
        isMe: false,
      },
    ],
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeContact, messages])

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeContact) return

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: user?.id || "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
      isMe: true,
    }

    setMessages((prev) => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), newMsg],
    }))

    setNewMessage("")

    // Mark messages as read
    setContacts((prev) =>
      prev.map((contact) => (contact.id === activeContact ? { ...contact, unread: 0, typing: false } : contact)),
    )

    // Simulate reply after 2 seconds
    if (activeContact === "1") {
      setTimeout(() => {
        setContacts((prev) =>
          prev.map((contact) => (contact.id === activeContact ? { ...contact, typing: true } : contact)),
        )

        setTimeout(() => {
          const replyMsg: Message = {
            id: Date.now().toString(),
            senderId: activeContact,
            text: "Thanks for the update! Looking forward to our next meeting.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "delivered",
            isMe: false,
          }

          setMessages((prev) => ({
            ...prev,
            [activeContact]: [...(prev[activeContact] || []), replyMsg],
          }))

          setContacts((prev) =>
            prev.map((contact) => (contact.id === activeContact ? { ...contact, typing: false } : contact)),
          )
        }, 2000)
      }, 1000)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Please log in to access your messages.</p>
        <Button className="mt-4" asChild>
          <a href="/login">Log In</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-6xl mx-auto overflow-hidden">
        <CardContent className="p-0">
          <div className="flex h-[calc(80vh)]">
            {/* Contacts sidebar */}
            {(!isMobileView || !activeContact) && (
              <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Messages</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 border-b border-gray-200 dark:border-gray-700 flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        activeContact === contact.id ? "bg-gray-50 dark:bg-gray-800" : ""
                      }`}
                      onClick={() => setActiveContact(contact.id)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{contact.avatar}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{contact.name}</h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{contact.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[180px]">
                            {contact.typing ? (
                              <span className="text-indigo-600 dark:text-indigo-400">Typing...</span>
                            ) : (
                              contact.lastMessage
                            )}
                          </p>
                          {contact.unread > 0 && <Badge className="ml-2 bg-indigo-600">{contact.unread}</Badge>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat area */}
            {activeContact && (
              <div className="w-full md:w-2/3 flex flex-col">
                {/* Chat header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    {isMobileView && (
                      <Button variant="ghost" size="icon" className="mr-2" onClick={() => setActiveContact(null)}>
                        <ChevronLeft size={20} />
                      </Button>
                    )}
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{contacts.find((c) => c.id === activeContact)?.avatar || "?"}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <h3 className="font-medium">{contacts.find((c) => c.id === activeContact)?.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {contacts.find((c) => c.id === activeContact)?.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info size={20} />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                  <div className="space-y-4">
                    {messages[activeContact]?.map((message) => (
                      <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                        {!message.isMe && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarFallback>
                              {contacts.find((c) => c.id === message.senderId)?.avatar || "?"}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[70%] px-4 py-2 rounded-lg ${
                            message.isMe
                              ? "bg-indigo-600 text-white"
                              : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <p>{message.text}</p>
                          <div
                            className={`text-xs mt-1 flex justify-end ${
                              message.isMe ? "text-indigo-200" : "text-gray-500"
                            }`}
                          >
                            {message.time}
                            {message.isMe && (
                              <span className="ml-1">
                                {message.status === "read" ? "✓✓" : message.status === "delivered" ? "✓✓" : "✓"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {contacts.find((c) => c.id === activeContact)?.typing && (
                      <div className="flex justify-start">
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarFallback>{contacts.find((c) => c.id === activeContact)?.avatar || "?"}</AvatarFallback>
                        </Avatar>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <Button variant="ghost" size="icon">
                      <ImageIcon size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Smile size={20} />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      className="flex-1 mx-2"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button variant="ghost" size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="container mx-auto p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4">We're having trouble loading your messages. Please try again later.</p>
          <pre className="text-left bg-gray-100 p-4 rounded mb-4 overflow-auto max-h-40 text-xs">{error.message}</pre>
          <Button className="mr-4" onClick={reset}>
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      )}
    >
      <Suspense
        fallback={
          <div className="container mx-auto p-8 flex justify-center items-center">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent mb-4"></div>
              <p>Loading messages...</p>
            </div>
          </div>
        }
      >
        <MessagesContent />
      </Suspense>
    </ErrorBoundary>
  )
}
