"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Camera, Clock, Users, Star, Mountain, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data for monasteries
const monasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    location: "East Sikkim",
    coordinates: { lat: 27.3389, lng: 88.5583 },
    founded: "1740",
    tradition: "Kagyu",
    description: "The largest monastery in Sikkim and seat of the Karmapa.",
    image: "/rumtek-monastery-sikkim-buddhist-temple.jpg",
    rating: 4.8,
    visitors: "500+ daily",
    features: ["Virtual Tour", "Audio Guide", "Historical Archives"],
    festivals: ["Losar", "Buddha Jayanti"],
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    location: "West Sikkim",
    coordinates: { lat: 27.2167, lng: 88.2167 },
    founded: "1705",
    tradition: "Nyingma",
    description: "One of the oldest and most important monasteries in Sikkim.",
    image: "/pemayangtse-monastery-sikkim-ancient-buddhist-temp.jpg",
    rating: 4.7,
    visitors: "300+ daily",
    features: ["Virtual Tour", "Manuscript Collection", "Architecture Guide"],
    festivals: ["Chaam Dance", "Drupka Teshi"],
  },
  {
    id: 3,
    name: "Enchey Monastery",
    location: "East Sikkim",
    coordinates: { lat: 27.3314, lng: 88.6138 },
    founded: "1909",
    tradition: "Nyingma",
    description: "Known for its annual Chaam dance performances.",
    image: "/enchey-monastery-gangtok-sikkim-buddhist-temple.jpg",
    rating: 4.6,
    visitors: "200+ daily",
    features: ["Cultural Events", "Dance Performances", "Prayer Wheels"],
    festivals: ["Chaam Dance", "Losar"],
  },
  {
    id: 4,
    name: "Tashiding Monastery",
    location: "West Sikkim",
    coordinates: { lat: 27.2833, lng: 88.2667 },
    founded: "1717",
    tradition: "Nyingma",
    description: "Sacred site with the holy Bumchu ceremony.",
    image: "/tashiding-monastery-sikkim-hilltop-buddhist-temple.jpg",
    rating: 4.9,
    visitors: "150+ daily",
    features: ["Sacred Ceremonies", "Mountain Views", "Pilgrimage Site"],
    festivals: ["Bumchu", "Saga Dawa"],
  },
  {
    id: 5,
    name: "Dubdi Monastery",
    location: "West Sikkim",
    coordinates: { lat: 27.2, lng: 88.2 },
    founded: "1701",
    tradition: "Nyingma",
    description: "The first monastery built in Sikkim.",
    image: "/dubdi-monastery-yuksom-sikkim-first-buddhist-templ.jpg",
    rating: 4.5,
    visitors: "100+ daily",
    features: ["Historical Significance", "Trekking Route", "Ancient Artifacts"],
    festivals: ["Pang Lhabsol", "Drupka Teshi"],
  },
  {
    id: 6,
    name: "Ralang Monastery",
    location: "South Sikkim",
    coordinates: { lat: 27.1667, lng: 88.3 },
    founded: "1768",
    tradition: "Kagyu",
    description: "Famous for its sacred Kagyu lineage teachings.",
    image: "/ralang-monastery-sikkim-kagyu-buddhist-temple.jpg",
    rating: 4.4,
    visitors: "120+ daily",
    features: ["Lineage Teachings", "Meditation Halls", "Sacred Texts"],
    festivals: ["Pang Lhabsol", "Losar"],
  },
]

export default function MapPage() {
  const [selectedMonastery, setSelectedMonastery] = useState<(typeof monasteries)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [traditionFilter, setTraditionFilter] = useState("all")

  const filteredMonasteries = monasteries.filter((monastery) => {
    const matchesSearch =
      monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monastery.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "all" || monastery.location === locationFilter
    const matchesTradition = traditionFilter === "all" || monastery.tradition === traditionFilter

    return matchesSearch && matchesLocation && matchesTradition
  })

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Mountain className="h-7 w-7 text-primary" />
              <span className="font-heading font-semibold text-xl text-foreground">Monastery360</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/tours"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Tours
              </Link>
              <Link href="/map" className="text-sm font-medium text-secondary">
                Map
              </Link>
              <Link
                href="/archives"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Archives
              </Link>
              <Link
                href="/calendar"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Calendar
              </Link>
            </div>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-96 border-r border-border/50 bg-muted/10 overflow-y-auto">
          <div className="p-6">
            <div className="mb-8">
              <h1 className="font-heading font-medium text-2xl mb-2 tracking-tight">Interactive Map</h1>
              <p className="text-muted-foreground text-sm">
                Explore {monasteries.length} sacred monasteries across Sikkim
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search monasteries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 bg-background/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="border-0 bg-background/50">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="East Sikkim">East Sikkim</SelectItem>
                    <SelectItem value="West Sikkim">West Sikkim</SelectItem>
                    <SelectItem value="South Sikkim">South Sikkim</SelectItem>
                    <SelectItem value="North Sikkim">North Sikkim</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={traditionFilter} onValueChange={setTraditionFilter}>
                  <SelectTrigger className="border-0 bg-background/50">
                    <SelectValue placeholder="Tradition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Traditions</SelectItem>
                    <SelectItem value="Nyingma">Nyingma</SelectItem>
                    <SelectItem value="Kagyu">Kagyu</SelectItem>
                    <SelectItem value="Gelug">Gelug</SelectItem>
                    <SelectItem value="Sakya">Sakya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredMonasteries.map((monastery) => (
                <Card
                  key={monastery.id}
                  className={`cursor-pointer transition-all hover:bg-background/80 border-0 shadow-none bg-background/30 ${
                    selectedMonastery?.id === monastery.id ? "bg-background ring-1 ring-secondary/20" : ""
                  }`}
                  onClick={() => setSelectedMonastery(monastery)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="font-heading font-medium text-lg tracking-tight">
                          {monastery.name}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {monastery.location}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-3 w-3 fill-secondary text-secondary" />
                        <span className="font-medium">{monastery.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary border-0">
                        {monastery.tradition}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Founded {monastery.founded}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {monastery.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        {monastery.visitors}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 relative bg-muted/5">
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading font-medium text-xl mb-2 tracking-tight">Interactive Map</h3>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                Interactive map with monastery locations will be displayed here. Select monasteries from the sidebar to
                view details.
              </p>
            </div>

            <div className="absolute inset-0 pointer-events-none">
              {filteredMonasteries.map((monastery, index) => (
                <div
                  key={monastery.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  style={{
                    left: `${20 + ((index * 15) % 60)}%`,
                    top: `${30 + ((index * 10) % 40)}%`,
                  }}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 border-white shadow-md cursor-pointer transition-all hover:scale-110 ${
                      selectedMonastery?.id === monastery.id ? "bg-secondary ring-2 ring-secondary/30" : "bg-primary/70"
                    }`}
                    onClick={() => setSelectedMonastery(monastery)}
                  />
                </div>
              ))}
            </div>
          </div>

          {selectedMonastery && (
            <div className="absolute bottom-6 left-6 right-6">
              <Card className="shadow-lg border-0 bg-background/95 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-heading font-medium text-xl tracking-tight">
                        {selectedMonastery.name}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedMonastery.location} • Founded {selectedMonastery.founded}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-medium">{selectedMonastery.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{selectedMonastery.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="border-secondary/20 text-secondary">
                          {selectedMonastery.tradition} Tradition
                        </Badge>
                        <Badge variant="outline" className="border-muted">
                          <Users className="h-3 w-3 mr-1" />
                          {selectedMonastery.visitors}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedMonastery.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs bg-secondary/10 border-0">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Upcoming Festivals</h4>
                        <div className="space-y-2">
                          {selectedMonastery.festivals.map((festival) => (
                            <div key={festival} className="flex items-center text-sm">
                              <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
                              {festival}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button size="sm" className="flex-1">
                          <Camera className="h-4 w-4 mr-2" />
                          Virtual Tour
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
