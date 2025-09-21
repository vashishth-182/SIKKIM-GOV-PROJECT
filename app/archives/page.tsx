"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Download,
  Eye,
  Tag,
  FileText,
  ImageIcon,
  Video,
  Mic,
  Mountain,
  ArrowLeft,
  Grid3X3,
  List,
} from "lucide-react"
import Link from "next/link"

// Mock data for digital archives
const archiveItems = [
  {
    id: 1,
    title: "Prajnaparamita Manuscript",
    type: "manuscript",
    monastery: "Rumtek Monastery",
    date: "15th Century",
    language: "Tibetan",
    description: "Ancient Buddhist text on the perfection of wisdom, handwritten on palm leaves with gold ink.",
    image: "/placeholder.svg?key=manuscript1",
    category: "Religious Texts",
    condition: "Excellent",
    pages: 108,
    digitized: "2023",
    downloads: 1247,
    views: 5632,
    featured: true,
    tags: ["Buddhism", "Philosophy", "Ancient Text", "Gold Ink"],
  },
  {
    id: 2,
    title: "Mahakala Dance Mask",
    type: "artifact",
    monastery: "Pemayangtse Monastery",
    date: "18th Century",
    language: "N/A",
    description:
      "Sacred ritual mask used in Chaam dance performances, carved from wood and painted with traditional colors.",
    image: "/placeholder.svg?key=mask1",
    category: "Ritual Objects",
    condition: "Good",
    material: "Wood, Paint, Fabric",
    digitized: "2023",
    downloads: 892,
    views: 3421,
    featured: true,
    tags: ["Ritual", "Dance", "Mahakala", "Traditional Art"],
  },
  {
    id: 3,
    title: "Monastery Foundation Chronicle",
    type: "document",
    monastery: "Tashiding Monastery",
    date: "1717 AD",
    language: "Tibetan",
    description: "Historical document detailing the founding of Tashiding Monastery and its early years.",
    image: "/placeholder.svg?key=document1",
    category: "Historical Documents",
    condition: "Fair",
    pages: 24,
    digitized: "2022",
    downloads: 567,
    views: 2134,
    featured: false,
    tags: ["History", "Foundation", "Chronicle", "Monastery"],
  },
  {
    id: 4,
    title: "Mural of Buddha's Life",
    type: "artwork",
    monastery: "Enchey Monastery",
    date: "19th Century",
    language: "N/A",
    description: "Detailed wall painting depicting scenes from Buddha's life, photographed in high resolution.",
    image: "/placeholder.svg?key=mural1",
    category: "Art & Murals",
    condition: "Restored",
    dimensions: "3m x 2m",
    digitized: "2023",
    downloads: 1834,
    views: 7892,
    featured: true,
    tags: ["Buddha", "Mural", "Life Story", "Art"],
  },
  {
    id: 5,
    title: "Chanting Audio Recording",
    type: "audio",
    monastery: "Rumtek Monastery",
    date: "2023",
    language: "Tibetan",
    description: "Traditional Buddhist chanting recorded during morning prayers at Rumtek Monastery.",
    image: "/placeholder.svg?key=audio1",
    category: "Audio Recordings",
    condition: "New",
    duration: "45 minutes",
    digitized: "2023",
    downloads: 2156,
    views: 4567,
    featured: false,
    tags: ["Chanting", "Prayer", "Traditional", "Audio"],
  },
  {
    id: 6,
    title: "Monastery Architecture Plans",
    type: "document",
    monastery: "Dubdi Monastery",
    date: "1701 AD",
    language: "Tibetan",
    description: "Original architectural drawings and plans for Sikkim's first monastery.",
    image: "/placeholder.svg?key=plans1",
    category: "Architecture",
    condition: "Fragile",
    pages: 12,
    digitized: "2022",
    downloads: 423,
    views: 1876,
    featured: false,
    tags: ["Architecture", "Plans", "First Monastery", "Historical"],
  },
]

const categories = [
  "All Categories",
  "Religious Texts",
  "Historical Documents",
  "Art & Murals",
  "Ritual Objects",
  "Audio Recordings",
  "Architecture",
]

const typeIcons = {
  manuscript: FileText,
  document: FileText,
  artwork: ImageIcon,
  artifact: Tag,
  audio: Mic,
  video: Video,
}

export default function ArchivesPage() {
  const [selectedItem, setSelectedItem] = useState<(typeof archiveItems)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  const filteredItems = archiveItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = categoryFilter === "All Categories" || item.category === categoryFilter
      const matchesType = typeFilter === "all" || item.type === typeFilter

      return matchesSearch && matchesCategory && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        case "newest":
          return new Date(b.digitized).getTime() - new Date(a.digitized).getTime()
        case "popular":
          return b.views - a.views
        case "downloads":
          return b.downloads - a.downloads
        default:
          return 0
      }
    })

  if (selectedItem) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <Mountain className="h-7 w-7 text-primary" />
                <span className="font-heading font-semibold text-xl text-foreground">Monastery360</span>
              </Link>

              <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Archives
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="aspect-square bg-muted/20 rounded-lg overflow-hidden">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Resolution
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {selectedItem.featured && (
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-muted text-muted-foreground">
                    {selectedItem.type}
                  </Badge>
                </div>
                <h1 className="font-heading font-medium text-3xl mb-4 tracking-tight">{selectedItem.title}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">{selectedItem.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-sm mb-2">Monastery</h3>
                  <p className="text-muted-foreground">{selectedItem.monastery}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-2">Date</h3>
                  <p className="text-muted-foreground">{selectedItem.date}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-2">Category</h3>
                  <p className="text-muted-foreground">{selectedItem.category}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-2">Condition</h3>
                  <p className="text-muted-foreground">{selectedItem.condition}</p>
                </div>
                {selectedItem.language !== "N/A" && (
                  <div>
                    <h3 className="font-medium text-sm mb-2">Language</h3>
                    <p className="text-muted-foreground">{selectedItem.language}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-sm mb-2">Digitized</h3>
                  <p className="text-muted-foreground">{selectedItem.digitized}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-secondary/10 text-secondary border-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border/50">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  {selectedItem.views.toLocaleString()} views
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  {selectedItem.downloads.toLocaleString()} downloads
                </div>
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
              <Link
                href="/tours"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Tours
              </Link>
              <Link
                href="/map"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Map
              </Link>
              <Link href="/archives" className="text-sm font-medium text-secondary">
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
          <h1 className="font-heading font-medium text-4xl md:text-5xl mb-4 tracking-tight">Digital Archives</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Explore our comprehensive collection of digitized manuscripts, historical documents, sacred artifacts, and
            cultural treasures from Sikkim's monasteries.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 bg-muted/30"
              />
            </div>
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 border-0 bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32 border-0 bg-muted/30">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="manuscript">Manuscripts</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="artwork">Artwork</SelectItem>
                  <SelectItem value="artifact">Artifacts</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 border-0 bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Viewed</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-6">
              <span>{filteredItems.length} items found</span>
              <span>•</span>
              <span>{archiveItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()} total views</span>
              <span>•</span>
              <span>
                {archiveItems.reduce((sum, item) => sum + item.downloads, 0).toLocaleString()} total downloads
              </span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="mb-8 bg-muted/30 border-0">
            <TabsTrigger value="grid" className="data-[state=active]:bg-background">
              <Grid3X3 className="h-4 w-4 mr-2" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-background">
              <List className="h-4 w-4 mr-2" />
              List
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const IconComponent = typeIcons[item.type as keyof typeof typeIcons] || FileText
                return (
                  <Card
                    key={item.id}
                    className="group cursor-pointer hover:shadow-md transition-all border-0 bg-muted/20"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        {item.featured && (
                          <Badge variant="secondary" className="mb-2 bg-secondary/90 border-0">
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline" className="bg-black/30 text-white border-white/20 backdrop-blur-sm">
                          <IconComponent className="h-3 w-3 mr-1" />
                          {item.type}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="font-heading font-medium text-lg line-clamp-2 tracking-tight">{item.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                        <span>{item.monastery}</span>
                        <span>{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {item.views.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {item.downloads.toLocaleString()}
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary border-0">
                          {item.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const IconComponent = typeIcons[item.type as keyof typeof typeIcons] || FileText
                return (
                  <Card
                    key={item.id}
                    className="cursor-pointer hover:shadow-md transition-all border-0 bg-muted/20"
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-muted/30 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3">
                            {item.featured && (
                              <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                                Featured
                              </Badge>
                            )}
                            <Badge variant="outline" className="border-muted text-muted-foreground">
                              <IconComponent className="h-3 w-3 mr-1" />
                              {item.type}
                            </Badge>
                            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                              {item.category}
                            </Badge>
                          </div>
                          <h3 className="font-heading font-medium text-lg mb-2 tracking-tight">{item.title}</h3>
                          <p className="text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{item.monastery}</span>
                            <span>•</span>
                            <span>{item.date}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {item.views.toLocaleString()}
                            </div>
                            <span>•</span>
                            <div className="flex items-center">
                              <Download className="h-3 w-3 mr-1" />
                              {item.downloads.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
