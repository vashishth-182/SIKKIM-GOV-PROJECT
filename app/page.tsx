import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Camera, BookOpen, Calendar, Mountain, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Mountain className="h-7 w-7 text-primary" />
              <span className="font-heading font-semibold text-xl text-foreground">Monastery360</span>
            </div>

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
              <Link
                href="/calendar"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Calendar
              </Link>
            </div>

            <div className="flex items-center">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-medium text-5xl md:text-6xl lg:text-7xl text-balance mb-6 tracking-tight">
            Sikkim's Sacred
            <span className="block text-secondary">Monasteries</span>
          </h1>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto mb-12 leading-relaxed">
            Explore the rich cultural heritage of over 200 monasteries through immersive digital experiences and
            comprehensive archives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3">
              <Camera className="mr-2 h-4 w-4" />
              Start Exploring
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
              <MapPin className="mr-2 h-4 w-4" />
              View Map
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-medium text-3xl md:text-4xl mb-4 tracking-tight">
              Digital Heritage Platform
            </h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Experience sacred heritage through modern technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-none bg-background/50 hover:bg-background transition-colors group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Camera className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="font-heading font-medium text-xl">Virtual Tours</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Immersive 360° experiences with multi-language narration and interactive hotspots.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link
                  href="/tours"
                  className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                >
                  Explore Tours
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none bg-background/50 hover:bg-background transition-colors group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="font-heading font-medium text-xl">Interactive Map</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Geo-tagged locations with detailed information and travel routes.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link
                  href="/map"
                  className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                >
                  View Map
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none bg-background/50 hover:bg-background transition-colors group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="font-heading font-medium text-xl">Digital Archives</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Comprehensive collection of manuscripts, artifacts, and historical documents.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link
                  href="/archives"
                  className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                >
                  Browse Archives
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none bg-background/50 hover:bg-background transition-colors group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="font-heading font-medium text-xl">Cultural Calendar</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Sacred festivals, ceremonies, and cultural events with booking options.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link
                  href="/calendar"
                  className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                >
                  View Events
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-heading font-medium text-foreground mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Monasteries</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-medium text-foreground mb-2">17th</div>
              <div className="text-sm text-muted-foreground">Century Origins</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-medium text-foreground mb-2">360°</div>
              <div className="text-sm text-muted-foreground">Virtual Tours</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-medium text-foreground mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Mountain className="h-5 w-5 text-primary" />
              <span className="font-heading font-medium">Monastery360</span>
            </div>
            <div className="text-sm text-muted-foreground">Preserving Sikkim's sacred heritage</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
