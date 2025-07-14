"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Globe, MessageCircle, Video, Mic, Users, MapPin, Search, Filter, Star, UserPlus, Check, X } from "lucide-react"
import Link from "next/link"

// Mock data for users around the world
// followStatus: 'not_followed', 'pending', 'accepted'
const initialWorldUsers = [
  {
    id: 1,
    name: "Maria Santos",
    country: "Brazil",
    languages: ["Portuguese", "English"],
    learning: "Spanish",
    lat: -15.7942,
    lng: -47.8822,
    online: true,
    followStatus: "accepted", // Already connected
  },
  {
    id: 2,
    name: "Hiroshi Tanaka",
    country: "Japan",
    languages: ["Japanese", "English"],
    learning: "French",
    lat: 35.6762,
    lng: 139.6503,
    online: true,
    followStatus: "pending", // Follow request sent by current user
  },
  {
    id: 3,
    name: "Emma Johnson",
    country: "UK",
    languages: ["English"],
    learning: "Mandarin",
    lat: 51.5074,
    lng: -0.1278,
    online: false,
    followStatus: "not_followed", // Not yet followed
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    country: "Egypt",
    languages: ["Arabic", "English"],
    learning: "German",
    lat: 30.0444,
    lng: 31.2357,
    online: true,
    followStatus: "accepted",
  },
  {
    id: 5,
    name: "Sophie Dubois",
    country: "France",
    languages: ["French", "English"],
    learning: "Italian",
    lat: 48.8566,
    lng: 2.3522,
    online: true,
    followStatus: "not_followed",
  },
  {
    id: 6,
    name: "Carlos Rodriguez",
    country: "Mexico",
    languages: ["Spanish", "English"],
    learning: "Portuguese",
    lat: 19.4326,
    lng: -99.1332,
    online: true,
    followStatus: "not_followed",
  },
  {
    id: 7,
    name: "Priya Sharma",
    country: "India",
    languages: ["Hindi", "English"],
    learning: "Korean",
    lat: 28.6139,
    lng: 77.209,
    online: false,
    followStatus: "accepted",
  },
  {
    id: 8,
    name: "Lars Andersen",
    country: "Norway",
    languages: ["Norwegian", "English"],
    learning: "Japanese",
    lat: 59.9139,
    lng: 10.7522,
    online: true,
    followStatus: "not_followed",
  },
]

// Mock follow requests received by the current user
const initialFollowRequests = [
  { id: 101, name: "John Doe", country: "USA", languages: ["English"], learning: "Spanish" },
  { id: 102, name: "Lena Müller", country: "Germany", languages: ["German"], learning: "English" },
]

export default function DashboardPage() {
  const [worldUsers, setWorldUsers] = useState(initialWorldUsers)
  const [followRequests, setFollowRequests] = useState(initialFollowRequests)
  const [selectedUser, setSelectedUser] = useState<(typeof initialWorldUsers)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = worldUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.languages.some((lang) => lang.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.learning.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleFollow = (userId: number) => {
    setWorldUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, followStatus: "pending" } : user)),
    )
    setSelectedUser((prevSelected) =>
      prevSelected?.id === userId ? { ...prevSelected, followStatus: "pending" } : prevSelected,
    )
  }

  const handleAcceptFollow = (requestId: number) => {
    const acceptedUser = followRequests.find((req) => req.id === requestId)
    if (acceptedUser) {
      setWorldUsers((prevUsers) => [
        ...prevUsers,
        { ...acceptedUser, lat: 0, lng: 0, online: true, followStatus: "accepted" }, // Add to main user list as accepted
      ])
      setFollowRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId))
    }
  }

  const handleDeclineFollow = (requestId: number) => {
    setFollowRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId))
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
            <Link href="/dashboard" className="text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/chat" className="text-gray-600 hover:text-blue-600 transition-colors">
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Stats & Follow Requests */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Languages Learning</span>
                  <Badge>3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Conversation Hours</span>
                  <Badge variant="secondary">127h</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Global Friends</span>
                  <Badge variant="outline">{worldUsers.filter((u) => u.followStatus === "accepted").length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Countries Visited</span>
                  <Badge className="bg-green-100 text-green-700">15</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Follow Requests ({followRequests.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {followRequests.length === 0 ? (
                  <p className="text-sm text-gray-500">No new follow requests.</p>
                ) : (
                  followRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>
                            {request.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{request.name}</p>
                          <p className="text-xs text-gray-500">{request.country}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-green-600 hover:bg-green-50"
                          onClick={() => handleAcceptFollow(request.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeclineFollow(request.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Center - World Map */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Global Language Community
                    </CardTitle>
                    <CardDescription>Discover language partners from around the world</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {worldUsers.filter((u) => u.online).length} Online Now
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex gap-2 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, country, or language..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                {/* Simplified World Map Visualization */}
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-6 mb-6 relative overflow-hidden">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">🌍 Interactive World Map</h3>
                    <p className="text-sm text-gray-600">Click on users to connect</p>
                  </div>

                  {/* Simulated map with user pins */}
                  <div className="grid grid-cols-4 gap-4 h-64">
                    {filteredUsers.map((user, index) => (
                      <div
                        key={user.id}
                        className={`relative cursor-pointer transform hover:scale-110 transition-transform ${
                          index % 4 === 0
                            ? "self-start"
                            : index % 4 === 1
                              ? "self-center"
                              : index % 4 === 2
                                ? "self-end"
                                : "self-center"
                        }`}
                        onClick={() => setSelectedUser(user)}
                      >
                        <div
                          className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold ${
                            user.online ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                          }`}
                        >
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        {user.online && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* User List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedUser?.id === user.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                      }`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {user.online && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {user.country}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex gap-1 mb-1">
                            {user.languages.map((lang) => (
                              <Badge key={lang} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">
                            Learning: <span className="text-blue-600 font-medium">{user.learning}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected User Actions */}
                {selectedUser && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Connect with {selectedUser.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">4.9</span>
                      </div>
                    </div>
                    {selectedUser.followStatus === "accepted" ? (
                      <div className="flex gap-2">
                        <Link href="/chat" className="flex-1">
                          <Button size="sm" className="w-full">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Video className="mr-2 h-4 w-4" />
                          Video Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Mic className="mr-2 h-4 w-4" />
                          Voice Call
                        </Button>
                      </div>
                    ) : selectedUser.followStatus === "pending" ? (
                      <Button size="sm" className="w-full" disabled>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Follow Request Sent
                      </Button>
                    ) : (
                      <Button size="sm" className="w-full" onClick={() => handleFollow(selectedUser.id)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Follow
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
