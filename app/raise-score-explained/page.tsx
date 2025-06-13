"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Sparkles, BarChart3, Megaphone, Gift } from "lucide-react"

export default function RaiseScoreExplainedPage() {
  const accentButtonClass =
    "bg-accent text-accent-foreground hover:bg-opacity-80 border border-accent transition-all duration-300 text-xs uppercase tracking-widest py-3 px-6"
  const buttonClass =
    "bg-primary text-primary-foreground hover:bg-foreground/80 border border-primary hover:border-accent transition-all duration-300 text-xs uppercase tracking-widest py-3 px-6"

  const features = [
    {
      icon: Sparkles,
      title: "Founder Brand",
      description: "Are you backable?",
    },
    {
      icon: BarChart3,
      title: "Proof & Traction",
      description: "Do your numbers tell a story?",
    },
    {
      icon: Megaphone,
      title: "Narrative & Media",
      description: "Does your pitch resonate?",
    },
  ]

  const packages = [
    {
      name: "Backable Founder Kit",
      price: "$3.5K",
      description: "Polish your pitch, brand, and origin story",
      link: "#",
    },
    {
      name: "Demo Day Dominator",
      price: "$12K",
      description: "Crush your deck, video, and social game",
      link: "#",
    },
    {
      name: "Momentum Engine",
      price: "$25K",
      description: "Own the narrative and get press coverage",
      link: "#",
    },
  ]

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="px-4 md:px-8 h-20 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <span className="text-2xl font-black tracking-tightest text-foreground">RAISE SCORE™</span>
        </Link>
        <Button
          asChild
          variant="outline"
          className="text-xs uppercase tracking-widest hover:text-accent hover:border-accent py-2 px-4"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 relative overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 opacity-5">
            {/* Placeholder for blurred blueprint-style startup icons - using a subtle pattern */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="blueprintGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#blueprintGrid)" />
            </svg>
          </div>
          <div className="container px-4 md:px-6 text-center relative">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tightest leading-tight">
              What’s Your Raise Score?
            </h1>
            <p className="mt-6 text-base md:text-lg text-background/80 max-w-2xl mx-auto">
              Find out if your startup is investor-ready — and what to fix if you’re not.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className={`${accentButtonClass} px-8 py-6 text-sm group`}>
                <Link href="/#quiz">
                  Take the Free Quiz
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What is the Raise Score? Section */}
        <section className="w-full py-16 md:py-24 border-b border-foreground">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                The Raise Score is a fast, no-fluff diagnostic to measure how ready your startup is to raise capital.
                It’s based on patterns from 1,000+ funded founders and reveals blind spots in your narrative, deck,
                traction, and founder brand.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="text-center p-6 border border-foreground/20 hover:border-accent transition-colors"
                >
                  <feature.icon className="w-12 h-12 text-accent mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold uppercase tracking-wider text-foreground">{feature.title}</h3>
                  <p className="text-sm text-foreground/70 mt-1">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Take the Quiz Section */}
        <section className="w-full py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-4">
              Ready to Discover Your Score?
            </h2>
            <p className="text-foreground/70 md:text-base mb-2">
              Answer 10 quick questions. It takes less than 5 minutes.
            </p>
            <p className="text-sm text-accent font-medium mb-8 uppercase tracking-wider">
              No email required to start — see your score instantly after completion.
            </p>
            <Button asChild size="lg" className={`${accentButtonClass} px-10 py-7 text-base group`}>
              <Link href="/#quiz">
                TAKE THE QUIZ NOW
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Sample Score Breakdown (Mockup) Section */}
        <section className="w-full py-16 md:py-24 border-b border-foreground">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
                A Glimpse of Your Report
              </h2>
              <p className="mt-3 text-foreground/70 md:text-base">
                Your personalized report breaks down exactly where you stand.
              </p>
            </div>
            <div className="max-w-md mx-auto bg-foreground text-background p-8 shadow-xl border border-background/30">
              <div className="text-center mb-6">
                <p className="text-sm uppercase tracking-wider text-background/70">Sample Raise Score™</p>
                <p className="text-7xl font-black text-accent my-1">
                  68<span className="text-4xl text-background/70">/100</span>
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs uppercase tracking-wider text-background/80 mb-1">
                    <span>Founder Brand</span>
                    <span>22/30</span>
                  </div>
                  <Progress value={(22 / 30) * 100} className="h-2 bg-background/20 [&>div]:bg-accent" />
                </div>
                <div>
                  <div className="flex justify-between text-xs uppercase tracking-wider text-background/80 mb-1">
                    <span>Narrative Strength</span>
                    <span>18/30</span>
                  </div>
                  <Progress value={(18 / 30) * 100} className="h-2 bg-background/20 [&>div]:bg-accent" />
                </div>
                <div>
                  <div className="flex justify-between text-xs uppercase tracking-wider text-background/80 mb-1">
                    <span>Proof & Metrics</span>
                    <span>15/25</span>
                  </div>
                  <Progress value={(15 / 25) * 100} className="h-2 bg-background/20 [&>div]:bg-accent" />
                </div>
                <div>
                  <div className="flex justify-between text-xs uppercase tracking-wider text-background/80 mb-1">
                    <span>Market Signal</span>
                    <span>13/15</span>
                  </div>
                  <Progress value={(13 / 15) * 100} className="h-2 bg-background/20 [&>div]:bg-accent" />
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button
                  asChild
                  className={`bg-foreground text-background hover:bg-foreground/80 w-full text-xs uppercase tracking-wider py-3 px-4`}
                >
                  <Link href="#book-call">WANT FULL BREAKDOWN? BOOK A FUNDRAISING REVIEW CALL</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Packages to Raise Your Score Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
                Fix Your Weak Points With These Kits
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="border border-foreground/20 p-6 flex flex-col text-center hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold uppercase tracking-wider text-accent">{pkg.name}</h3>
                  <p className="text-3xl font-black text-foreground my-3">{pkg.price}</p>
                  <p className="text-foreground/70 text-sm mb-6 flex-grow">{pkg.description}</p>
                  <Button asChild variant="outline" className={`${buttonClass} mt-auto text-xs py-3`}>
                    <Link href={pkg.link}>See What’s Included</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Limited Time Bonus Section */}
        <section className="w-full py-12 md:py-16 bg-accent text-accent-foreground">
          <div className="container px-4 md:px-6 text-center">
            <Gift className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">🎁 Bonus for Early Signups</h2>
            <p className="mt-3 text-base md:text-lg text-accent-foreground/80 max-w-xl mx-auto">
              Book a call by <span className="font-bold">June 30th, 2025</span> and get a free Founder Brand Audit
              (normally $500).
            </p>
          </div>
        </section>

        {/* Book a Fundraising Review Call Section */}
        <section id="book-call" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
              Get a Custom Plan to Raise Like a Pro
            </h2>
            <p className="mt-4 text-foreground/70 md:text-lg max-w-xl mx-auto">
              Walk away with a tactical roadmap, blind spot fixes, and investor insight.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className={`${accentButtonClass} px-10 py-7 text-base group`}>
                <Link href="#">
                  Book My $200 Screening Call
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="mt-4 text-sm text-foreground/60">100% credited toward any service if you move forward.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background/70 py-8 border-t border-background/20">
        <div className="container px-4 md:px-6 text-center text-xs uppercase tracking-wider">
          <p>Raise Score™ is not affiliated with any VC or financial institution. Built by founders, for founders.</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Raise Score. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
