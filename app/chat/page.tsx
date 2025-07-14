"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Globe,
  Video,
  Mic,
  Send,
  Languages,
  Volume2,
  MicOff,
  VideoOff,
  Phone,
  PhoneOff,
  Smile,
  Paperclip,
  MoreVertical,
  UserPlus,
} from "lucide-react"
import Link from "next/link"

// Mock chat data
// followStatus: 'not_followed', 'pending', 'accepted'
const initialMockChats = [
  {
    id: 1,
    name: "Maria Santos",
    country: "Brazil",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "¡Hola! How are you doing today?",
    time: "2m ago",
    online: true,
    unread: 2,
    language: "Spanish",
    followStatus: "accepted",
  },
  {
    id: 2,
    name: "Hiroshi Tanaka",
    country: "Japan",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "こんにちは！Let's practice Japanese today",
    time: "5m ago",
    online: true,
    unread: 0,
    language: "Japanese",
    followStatus: "pending", // Follow request sent, waiting for acceptance
  },
  {
    id: 3,
    name: "Sophie Dubois",
    country: "France",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Bonjour! Comment allez-vous?",
    time: "1h ago",
    online: false,
    unread: 1,
    language: "French",
    followStatus: "not_followed", // Not followed yet
  },
]

const mockMessages = [
  {
    id: 1,
    sender: "Maria Santos",
    message: "¡Hola! How are you doing today?",
    time: "10:30 AM",
    isMe: false,
    translated: "Hello! How are you doing today?",
    showTranslation: false,
  },
  {
    id: 2,
    sender: "You",
    message: "Hi Maria! I'm doing great, thanks for asking. How about you?",
    time: "10:32 AM",
    isMe: true,
    translated: "¡Hola María! Estoy muy bien, gracias por preguntar. ¿Y tú?",
    showTranslation: false,
  },
  {
    id: 3,
    sender: "Maria Santos",
    message: "Estoy muy bien también. ¿Quieres practicar español hoy?",
    time: "10:33 AM",
    isMe: false,
    translated: "I'm doing very well too. Do you want to practice Spanish today?",
    showTranslation: false,
  },
  {
    id: 4,
    sender: "You",
    message: "¡Sí, me encantaría! I've been practicing my pronunciation.",
    time: "10:35 AM",
    isMe: true,
    translated: "Yes, I would love to! He estado practicando mi pronunciación.",
    showTranslation: false,
  },
]

export default function ChatPage() {
  const [mockChats, setMockChats] = useState(initialMockChats)
  const [selectedChat, setSelectedChat] = useState(initialMockChats[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isVideoCall, setIsVideoCall] = useState(false)
  const [isVoiceCall, setIsVoiceCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const canCommunicate = selectedChat.followStatus === "accepted"

  const sendMessage = () => {
    if (newMessage.trim() && canCommunicate) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
        translated: "",
        showTranslation: false,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const toggleTranslation = (messageId: number) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, showTranslation: !msg.showTranslation } : msg)))
  }

  const startVideoCall = () => {
    if (canCommunicate) {
      setIsVideoCall(true)
      setIsVoiceCall(false)
    }
  }

  const startVoiceCall = () => {
    if (canCommunicate) {
      setIsVoiceCall(true)
      setIsVideoCall(false)
    }
  }

  const endCall = () => {
    setIsVideoCall(false)
    setIsVoiceCall(false)
    setIsMuted(false)
    setIsVideoOff(false)
  }

  const handleFollow = (chatId: number) => {
    setMockChats((prevChats) =>
      prevChats.map((chat) => (chat.id === chatId ? { ...chat, followStatus: "pending" } : chat)),
    )
    setSelectedChat((prevSelected) =>
      prevSelected?.id === chatId ? { ...prevSelected, followStatus: "pending" } : prevSelected,
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinguaConnect
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/chat" className="text-blue-600 font-medium">
              Chat
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r bg-white">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-3">Messages</h2>
            <Input placeholder="Search conversations..." className="mb-3" />
            <div className="flex gap-2">
              <Badge variant="secondary" className="cursor-pointer">
                All
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                Online
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                Unread
              </Badge>
            </div>
          </div>

          <ScrollArea className="h-full">
            <div className="p-2">
              {mockChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedChat.id === chat.id ? "bg-blue-50 border border-blue-200" : ""
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {chat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{chat.name}</p>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <Badge className="ml-2 bg-blue-600 text-white text-xs">{chat.unread}</Badge>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs">
                          {chat.language}
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">{chat.country}</span>
                        {chat.followStatus === "pending" && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Pending
                          </Badge>
                        )}
                        {chat.followStatus === "not_followed" && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Not Followed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedChat.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {selectedChat.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{selectedChat.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedChat.online ? "Online" : "Last seen 1h ago"} • {selectedChat.country}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={startVoiceCall} disabled={!canCommunicate}>
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={startVideoCall} disabled={!canCommunicate}>
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" disabled={!canCommunicate}>
                <Languages className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Communication Status / Call Overlay */}
          {!canCommunicate && (
            <div className="p-4 bg-yellow-50 border-b border-yellow-200 text-yellow-800 text-center text-sm">
              {selectedChat.followStatus === "pending"
                ? "Follow request sent. Waiting for acceptance to chat."
                : "Follow this user to start a conversation."}
              {selectedChat.followStatus === "not_followed" && (
                <Button
                  variant="link"
                  size="sm"
                  className="ml-2 text-yellow-800 hover:text-yellow-900"
                  onClick={() => handleFollow(selectedChat.id)}
                >
                  <UserPlus className="h-3 w-3 mr-1" /> Send Follow Request
                </Button>
              )}
            </div>
          )}

          {(isVideoCall || isVoiceCall) && (
            <div className="absolute inset-0 bg-gray-900 z-50 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-8">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-4xl">
                      {selectedChat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-semibold mb-2">{selectedChat.name}</h2>
                  <p className="text-gray-300">{isVideoCall ? "Video Call" : "Voice Call"} • 00:45</p>
                </div>

                {isVideoCall && (
                  <div className="mb-8 bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
                    <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-gray-400">Your Video</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <Button
                    variant={isMuted ? "destructive" : "secondary"}
                    size="lg"
                    className="rounded-full w-12 h-12"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>

                  {isVideoCall && (
                    <Button
                      variant={isVideoOff ? "destructive" : "secondary"}
                      size="lg"
                      className="rounded-full w-12 h-12"
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                    </Button>
                  )}

                  <Button variant="destructive" size="lg" className="rounded-full w-12 h-12" onClick={endCall}>
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs lg:max-w-md ${message.isMe ? "order-2" : "order-1"}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.isMe ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${message.isMe ? "text-blue-100" : "text-gray-500"}`}>
                          {message.time}
                        </span>
                        {!message.isMe && message.translated && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => toggleTranslation(message.id)}
                          >
                            <Languages className="h-3 w-3 mr-1" />
                            {message.showTranslation ? "Original" : "Translate"}
                          </Button>
                        )}
                      </div>
                      {message.showTranslation && message.translated && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-600 italic">{message.translated}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {!message.isMe && (
                    <Avatar className="w-8 h-8 order-1 mr-2">
                      <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {selectedChat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled={!canCommunicate}>
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" disabled={!canCommunicate}>
                <Smile className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder={canCommunicate ? "Type your message..." : "Follow to send messages"}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="pr-20"
                  disabled={!canCommunicate}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" disabled={!canCommunicate}>
                    <Languages className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" disabled={!canCommunicate}>
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button onClick={sendMessage} disabled={!newMessage.trim() || !canCommunicate}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Real-time translation enabled</span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
