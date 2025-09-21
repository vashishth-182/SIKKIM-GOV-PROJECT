"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Camera,
  Search,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize,
  Languages,
  Clock,
  Users,
  Star,
  MapPin,
  Mountain,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

// Mock data for virtual tours
const virtualTours = [
  {
    id: 1,
    name: "Rumtek Monastery",
    location: "East Sikkim",
    duration: "12 minutes",
    scenes: 8,
    languages: ["English", "Hindi", "Nepali", "Tibetan"],
    difficulty: "Easy",
    highlights: ["Main Prayer Hall", "Golden Stupa", "Monk Quarters", "Sacred Relics"],
    description:
      "Experience the grandeur of Sikkim's largest monastery with detailed 360° views of the main prayer hall, golden stupa, and sacred artifacts.",
    image: "/rumtek-monastery-sikkim-buddhist-temple.jpg",
    rating: 4.9,
    views: "15.2K",
    featured: true,
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    location: "West Sikkim",
    duration: "10 minutes",
    scenes: 6,
    languages: ["English", "Hindi", "Nepali"],
    difficulty: "Moderate",
    highlights: ["Ancient Murals", "Wooden Sculptures", "Prayer Wheels", "Mountain Views"],
    description:
      "Explore one of Sikkim's oldest monasteries with intricate wooden sculptures and ancient murals dating back to the 18th century.",
    image: "/pemayangtse-monastery-sikkim-ancient-buddhist-temp.jpg",
    rating: 4.8,
    views: "12.8K",
    featured: true,
  },
  {
    id: 3,
    name: "Enchey Monastery",
    location: "East Sikkim",
    duration: "8 minutes",
    scenes: 5,
    languages: ["English", "Hindi"],
    difficulty: "Easy",
    highlights: ["Chaam Dance Arena", "Prayer Hall", "Sacred Masks", "City Views"],
    description:
      "Discover the monastery famous for its annual Chaam dance performances and stunning views of Gangtok city.",
    image: "/enchey-monastery-gangtok-sikkim-buddhist-temple.jpg",
    rating: 4.7,
    views: "9.5K",
    featured: false,
  },
  {
    id: 4,
    name: "Tashiding Monastery",
    location: "West Sikkim",
    duration: "15 minutes",
    scenes: 10,
    languages: ["English", "Hindi", "Nepali", "Tibetan"],
    difficulty: "Advanced",
    highlights: ["Sacred Bumchu", "Hilltop Views", "Ancient Stupas", "Pilgrimage Path"],
    description:
      "Journey through the most sacred monastery in Sikkim, home to the holy Bumchu ceremony and breathtaking Himalayan views.",
    image: "/tashiding-monastery-sikkim-hilltop-buddhist-temple.jpg",
    rating: 4.9,
    views: "18.7K",
    featured: true,
  },
]

const tourScenes = [
  { id: 1, name: "Entrance Gate", description: "Traditional monastery entrance with prayer flags" },
  { id: 2, name: "Main Courtyard", description: "Central gathering area for ceremonies" },
  { id: 3, name: "Prayer Hall", description: "Sacred space with Buddha statues and murals" },
  { id: 4, name: "Golden Stupa", description: "Sacred reliquary containing holy artifacts" },
  { id: 5, name: "Monk Quarters", description: "Living spaces of the monastery residents" },
  { id: 6, name: "Library", description: "Ancient texts and manuscripts collection" },
  { id: 7, name: "Meditation Hall", description: "Quiet space for contemplation and practice" },
  { id: 8, name: "Mountain View", description: "Panoramic views of the Himalayan landscape" },
]

export default function ToursPage() {
  const [selectedTour, setSelectedTour] = useState<(typeof virtualTours)[0] | null>(null)
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([75])
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const filteredTours = virtualTours.filter((tour) => {
    const matchesSearch =
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || tour.difficulty === difficultyFilter

    return matchesSearch && matchesDifficulty
  })

  const startTour = (tour: (typeof virtualTours)[0]) => {
    setSelectedTour(tour)
    setCurrentScene(0)
    setIsPlaying(true)
  }

  const nextScene = () => {
    if (selectedTour && currentScene < selectedTour.scenes - 1) {
      setCurrentScene(currentScene + 1)
    }
  }

  const previousScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1)
    }
  }

  if (selectedTour) {
    return (
      <div className="min-h-screen bg-black">
        <div className="relative h-screen">
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/monastery-interior-360-view.jpg')] bg-cover bg-center opacity-50" />
            <div className="relative z-10 text-center text-white">
              <h2 className="font-heading font-medium text-4xl mb-4 tracking-tight">
                {tourScenes[currentScene]?.name}
              </h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
                {tourScenes[currentScene]?.description}
              </p>
            </div>

            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-secondary rounded-full border-2 border-white shadow-md cursor-pointer animate-pulse hover:scale-125 transition-transform" />
            <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-secondary rounded-full border-2 border-white shadow-md cursor-pointer animate-pulse hover:scale-125 transition-transform" />
            <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-secondary rounded-full border-2 border-white shadow-md cursor-pointer animate-pulse hover:scale-125 transition-transform" />
          </div>

          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTour(null)}
                className="text-white hover:bg-white/10 border border-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="text-white">
                <h3 className="font-heading font-medium text-lg">{selectedTour.name}</h3>
                <p className="text-sm opacity-70">{selectedTour.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32 bg-black/30 border-white/20 text-white backdrop-blur-sm">
                  <Languages className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {selectedTour.languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border border-white/20">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="bg-black/60 backdrop-blur-md rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/10"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={previousScene}
                    disabled={currentScene === 0}
                    className="text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextScene}
                    disabled={currentScene === selectedTour.scenes - 1}
                    className="text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/10"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <div className="w-20">
                      <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="cursor-pointer" />
                    </div>
                  </div>
                  <div className="text-white text-sm">
                    {currentScene + 1} / {selectedTour.scenes}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 overflow-x-auto">
                {Array.from({ length: selectedTour.scenes }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentScene(i)}
                    className={`flex-shrink-0 px-4 py-2 rounded-md text-sm transition-colors font-medium ${
                      currentScene === i ? "bg-secondary text-white" : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    {tourScenes[i]?.name || `Scene ${i + 1}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
              <Link href="/tours" className="text-sm font-medium text-secondary">
                Tours
              </Link>
              <Link
                href="/map"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
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

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="font-heading font-medium text-4xl md:text-5xl mb-4 tracking-tight">Virtual Tours</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Immerse yourself in 360° virtual experiences of Sikkim's most sacred monasteries. Explore ancient
            architecture and spiritual spaces from anywhere.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search virtual tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-0 bg-muted/30"
            />
          </div>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full md:w-48 border-0 bg-muted/30">
              <SelectValue placeholder="Difficulty Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-16">
          <h2 className="font-heading font-medium text-2xl mb-8 tracking-tight">Featured Tours</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTours
              .filter((tour) => tour.featured)
              .map((tour) => (
                <Card
                  key={tour.id}
                  className="group overflow-hidden hover:shadow-lg transition-all border-0 bg-muted/20"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge variant="secondary" className="mb-2 bg-secondary/90 border-0">
                        Featured
                      </Badge>
                      <h3 className="font-heading font-medium text-xl tracking-tight">{tour.name}</h3>
                      <p className="text-sm opacity-80">{tour.location}</p>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center space-x-1 text-white">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {tour.duration}
                        </div>
                        <div className="flex items-center">
                          <Camera className="h-4 w-4 mr-1" />
                          {tour.scenes} scenes
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {tour.views}
                        </div>
                      </div>
                      <Badge variant="outline" className="border-secondary/20 text-secondary">
                        {tour.difficulty}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{tour.description}</p>

                    <div className="mb-6">
                      <h4 className="font-medium text-sm mb-2">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.map((highlight) => (
                          <Badge key={highlight} variant="secondary" className="text-xs bg-secondary/10 border-0">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Languages className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{tour.languages.length} languages</span>
                      </div>
                      <Button onClick={() => startTour(tour)}>
                        <Play className="h-4 w-4 mr-2" />
                        Start Tour
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        <div>
          <h2 className="font-heading font-medium text-2xl mb-8 tracking-tight">All Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <Card key={tour.id} className="group hover:shadow-md transition-all border-0 bg-muted/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-heading font-medium text-lg tracking-tight">{tour.name}</h3>
                    <p className="text-xs opacity-80 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {tour.location}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center space-x-1 text-white text-sm">
                    <Star className="h-3 w-3 fill-secondary text-secondary" />
                    {tour.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                    <span>{tour.duration}</span>
                    <span>{tour.scenes} scenes</span>
                    <Badge variant="outline" className="text-xs border-secondary/20 text-secondary">
                      {tour.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{tour.description}</p>
                  <Button size="sm" className="w-full" onClick={() => startTour(tour)}>
                    <Play className="h-3 w-3 mr-2" />
                    Start Tour
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
