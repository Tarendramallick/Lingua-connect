import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, MessageCircle, Video, Users, MapPin, Zap, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinguaConnect
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-blue-600 transition-colors">
              Community
            </Link>
            <Link href="/chat" className="text-gray-600 hover:text-blue-600 transition-colors">
              Chat
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            🌍 Connect with 50M+ language learners worldwide
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Learn Languages Through Real Connections
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join the world's most vibrant language learning community. Practice with native speakers, explore cultures
            on our interactive map, and communicate seamlessly with real-time translation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Globe className="mr-2 h-5 w-5" />
              Start Learning Now
            </Button>
            <Button size="lg" variant="outline">
              <Video className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50M+</div>
              <div className="text-sm text-gray-600">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">150+</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">200+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">Live Chat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Master Languages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From interactive maps to real-time translation, we've built the ultimate language learning ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Interactive World Map</CardTitle>
                <CardDescription>
                  Discover language partners from around the globe. See where your conversation partners are located in
                  real-time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Real-Time Translation</CardTitle>
                <CardDescription>
                  Break language barriers instantly with AI-powered translation that works across text, voice, and video
                  calls.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Video & Voice Chat</CardTitle>
                <CardDescription>
                  Practice pronunciation and conversation skills through high-quality video and voice calls with native
                  speakers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Smart Messaging</CardTitle>
                <CardDescription>
                  Chat with built-in grammar correction, vocabulary suggestions, and cultural context tips.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Community Groups</CardTitle>
                <CardDescription>
                  Join language-specific communities, participate in cultural exchanges, and make lifelong friendships.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Cultural Exchange</CardTitle>
                <CardDescription>
                  Learn about different cultures, traditions, and customs while improving your language skills.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Language Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join millions of learners connecting across cultures and languages.</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Globe className="mr-2 h-5 w-5" />
            Join LinguaConnect Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-6 w-6" />
                <span className="text-xl font-bold">LinguaConnect</span>
              </div>
              <p className="text-gray-400">Connecting language learners worldwide through technology and community.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>World Map</li>
                <li>Real-time Translation</li>
                <li>Video Chat</li>
                <li>Voice Chat</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Language Exchange</li>
                <li>Cultural Groups</li>
                <li>Events</li>
                <li>Forums</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LinguaConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
