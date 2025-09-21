"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Search,
  ChevronLeft,
  ChevronRight,
  Ticket,
  Heart,
  Mountain,
  ArrowLeft,
  CalendarDays,
  List,
} from "lucide-react"
import Link from "next/link"

// Mock data for cultural events
const culturalEvents = [
  {
    id: 1,
    title: "Losar Festival",
    monastery: "Rumtek Monastery",
    date: "2024-02-10",
    endDate: "2024-02-12",
    time: "06:00 AM - 06:00 PM",
    type: "Festival",
    description: "Tibetan New Year celebration with traditional dances, prayers, and cultural performances.",
    image: "/placeholder.svg?key=losar",
    location: "East Sikkim",
    duration: "3 days",
    participants: "500+",
    ticketPrice: "Free",
    bookingRequired: false,
    highlights: ["Chaam Dance", "Traditional Music", "Ceremonial Prayers", "Cultural Performances"],
    significance: "Most important festival in Tibetan Buddhism marking the new year",
    featured: true,
    category: "Religious Festival",
  },
  {
    id: 2,
    title: "Bumchu Festival",
    monastery: "Tashiding Monastery",
    date: "2024-03-15",
    endDate: "2024-03-15",
    time: "04:00 AM - 12:00 PM",
    type: "Ceremony",
    description: "Sacred water ceremony where holy water level predicts the year's fortune.",
    image: "/placeholder.svg?key=bumchu",
    location: "West Sikkim",
    duration: "1 day",
    participants: "1000+",
    ticketPrice: "₹50",
    bookingRequired: true,
    highlights: ["Sacred Water Ceremony", "Fortune Prediction", "Pilgrimage", "Blessings"],
    significance: "One of the most sacred ceremonies in Sikkim Buddhism",
    featured: true,
    category: "Sacred Ceremony",
  },
  {
    id: 3,
    title: "Chaam Dance Performance",
    monastery: "Enchey Monastery",
    date: "2024-01-28",
    endDate: "2024-01-29",
    time: "10:00 AM - 04:00 PM",
    type: "Performance",
    description: "Traditional masked dance performance depicting the victory of good over evil.",
    image: "/placeholder.svg?key=chaam",
    location: "East Sikkim",
    duration: "2 days",
    participants: "200+",
    ticketPrice: "₹100",
    bookingRequired: true,
    highlights: ["Masked Dancers", "Traditional Costumes", "Sacred Music", "Storytelling"],
    significance: "Ancient ritual dance form preserving Buddhist teachings",
    featured: false,
    category: "Cultural Performance",
  },
  {
    id: 4,
    title: "Buddha Jayanti",
    monastery: "Pemayangtse Monastery",
    date: "2024-05-23",
    endDate: "2024-05-23",
    time: "05:00 AM - 08:00 PM",
    type: "Festival",
    description: "Celebration of Buddha's birth, enlightenment, and death with prayers and processions.",
    image: "/placeholder.svg?key=buddha",
    location: "West Sikkim",
    duration: "1 day",
    participants: "800+",
    ticketPrice: "Free",
    bookingRequired: false,
    highlights: ["Prayer Ceremonies", "Procession", "Meditation Sessions", "Community Feast"],
    significance: "Commemorates the three most important events in Buddha's life",
    featured: true,
    category: "Religious Festival",
  },
  {
    id: 5,
    title: "Meditation Retreat",
    monastery: "Dubdi Monastery",
    date: "2024-04-10",
    endDate: "2024-04-17",
    time: "06:00 AM - 06:00 PM",
    type: "Retreat",
    description: "7-day silent meditation retreat in Sikkim's first monastery.",
    image: "/placeholder.svg?key=meditation",
    location: "West Sikkim",
    duration: "7 days",
    participants: "30",
    ticketPrice: "₹5000",
    bookingRequired: true,
    highlights: ["Silent Meditation", "Buddhist Teachings", "Nature Walks", "Spiritual Guidance"],
    significance: "Deep spiritual practice in a historic setting",
    featured: false,
    category: "Spiritual Retreat",
  },
  {
    id: 6,
    title: "Saga Dawa Festival",
    monastery: "Ralang Monastery",
    date: "2024-06-22",
    endDate: "2024-06-22",
    time: "04:00 AM - 10:00 PM",
    type: "Festival",
    description: "Holy month celebration with prayers, offerings, and merit-making activities.",
    image: "/placeholder.svg?key=saga",
    location: "South Sikkim",
    duration: "1 day",
    participants: "600+",
    ticketPrice: "Free",
    bookingRequired: false,
    highlights: ["Prayer Flags", "Merit Making", "Community Service", "Spiritual Teachings"],
    significance: "Celebrates Buddha's enlightenment and first teaching",
    featured: false,
    category: "Religious Festival",
  },
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof culturalEvents)[0] | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")

  const filteredEvents = culturalEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.monastery.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const eventsInCurrentMonth = filteredEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
  })

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border-r border-b border-border/30 last:border-r-0" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayEvents = eventsInCurrentMonth.filter((event) => event.date === dateStr)

      days.push(
        <div key={day} className="h-20 border-r border-b border-border/30 last:border-r-0 p-2 overflow-hidden">
          <div className="text-sm font-medium mb-1 text-foreground">{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 1).map((event) => (
              <div
                key={event.id}
                className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded cursor-pointer hover:bg-secondary/20 transition-colors truncate"
                onClick={() => setSelectedEvent(event)}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 1 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 1} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <Mountain className="h-7 w-7 text-primary" />
                <span className="font-heading font-semibold text-xl text-foreground">Monastery360</span>
              </Link>

              <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calendar
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="aspect-video bg-muted/20 rounded-lg overflow-hidden">
                <img
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  {selectedEvent.featured && (
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-muted text-muted-foreground">
                    {selectedEvent.type}
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                    {selectedEvent.category}
                  </Badge>
                </div>
                <h1 className="font-heading font-medium text-3xl mb-4 tracking-tight">{selectedEvent.title}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div>
                <h3 className="font-heading font-medium text-lg mb-4 tracking-tight">Event Highlights</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedEvent.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center text-sm">
                      <Star className="h-3 w-3 mr-2 text-secondary" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/20 p-6 rounded-lg">
                <h4 className="font-medium mb-3 text-sm">Cultural Significance</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedEvent.significance}</p>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-0 bg-muted/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center font-heading font-medium text-lg tracking-tight">
                    <Calendar className="h-5 w-5 mr-2" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Date</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Time</h4>
                      <p className="text-sm text-muted-foreground">{selectedEvent.time}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Duration</h4>
                      <p className="text-sm text-muted-foreground">{selectedEvent.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Participants</h4>
                      <p className="text-sm text-muted-foreground">{selectedEvent.participants}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Location
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedEvent.monastery}</p>
                    <p className="text-xs text-muted-foreground">{selectedEvent.location}</p>
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Entry Fee</h4>
                        <p className="text-2xl font-medium text-foreground">{selectedEvent.ticketPrice}</p>
                      </div>
                      {selectedEvent.bookingRequired && (
                        <Badge variant="outline" className="border-secondary/20 text-secondary">
                          Booking Required
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      {selectedEvent.bookingRequired ? (
                        <Button className="w-full">
                          <Ticket className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                      ) : (
                        <Button className="w-full">
                          <Heart className="h-4 w-4 mr-2" />
                          Add to Wishlist
                        </Button>
                      )}
                      <Button variant="outline" className="w-full bg-transparent">
                        <MapPin className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              <Link
                href="/archives"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Archives
              </Link>
              <Link href="/calendar" className="text-sm font-medium text-secondary">
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
          <h1 className="font-heading font-medium text-4xl md:text-5xl mb-4 tracking-tight">Cultural Calendar</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Discover and participate in sacred festivals, ceremonies, and cultural events happening across Sikkim's
            monasteries throughout the year.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events, festivals, or monasteries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-0 bg-muted/30"
            />
          </div>
          <div className="flex gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 border-0 bg-muted/30">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Religious Festival">Religious Festival</SelectItem>
                <SelectItem value="Sacred Ceremony">Sacred Ceremony</SelectItem>
                <SelectItem value="Cultural Performance">Cultural Performance</SelectItem>
                <SelectItem value="Spiritual Retreat">Spiritual Retreat</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {viewMode === "calendar" ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-medium text-2xl tracking-tight">
                {months[currentMonth]} {currentYear}
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-muted/10 rounded-lg border border-border/30 overflow-hidden">
              <div className="grid grid-cols-7 border-b border-border/30">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="p-3 text-center font-medium text-muted-foreground border-r border-border/30 last:border-r-0"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">{renderCalendarGrid()}</div>
            </div>

            <div>
              <h3 className="font-heading font-medium text-xl mb-6 tracking-tight">Upcoming Events This Month</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsInCurrentMonth.slice(0, 6).map((event) => (
                  <Card
                    key={event.id}
                    className="cursor-pointer hover:shadow-md transition-all border-0 bg-muted/20"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {event.featured && (
                          <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline" className="border-muted text-muted-foreground">
                          {event.type}
                        </Badge>
                      </div>
                      <h4 className="font-heading font-medium mb-2 tracking-tight">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{event.monastery}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        {event.duration}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="cursor-pointer hover:shadow-md transition-all border-0 bg-muted/20"
                onClick={() => setSelectedEvent(event)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted/30 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        {event.featured && (
                          <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline" className="border-muted text-muted-foreground">
                          {event.type}
                        </Badge>
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                          {event.category}
                        </Badge>
                      </div>
                      <h3 className="font-heading font-medium text-lg mb-2 tracking-tight">{event.title}</h3>
                      <p className="text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.monastery}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {event.participants}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium text-foreground">{event.ticketPrice}</div>
                      {event.bookingRequired && (
                        <Badge variant="outline" className="mt-2 border-secondary/20 text-secondary">
                          Booking Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
