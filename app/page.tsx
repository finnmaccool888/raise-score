"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  BarChart,
  Users,
  FileText,
  Target,
  Lightbulb,
  TrendingUp,
  BrainCircuit,
  Briefcase,
  Handshake,
  Menu,
  X,
  ArrowRight,
  UsersRound,
  Cpu,
} from "lucide-react"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { useState } from "react"
import { InteractiveQuiz } from "@/components/interactive-quiz"

export default function RaiseScorePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinkClass = "text-xs uppercase tracking-widest font-medium hover:text-accent transition-colors"
  const buttonClass =
    "bg-primary text-primary-foreground hover:bg-foreground/80 border border-primary hover:border-accent transition-all duration-300 text-xs uppercase tracking-widest py-2 px-4"
  const accentButtonClass =
    "bg-accent text-accent-foreground hover:bg-opacity-80 border border-accent transition-all duration-300 text-xs uppercase tracking-widest py-2 px-4"

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="px-4 md:px-8 h-20 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <span className="text-2xl font-black tracking-tightest text-foreground">RAISE SCORE™</span>
        </Link>
        <nav className="hidden lg:flex gap-6 items-center">
          <Link href="#how-it-works" className={navLinkClass} prefetch={false}>
            How It Works
          </Link>
          <Link href="/system" className={navLinkClass} prefetch={false}>
            System
          </Link>
          <Link href="/raise-score-explained" className={navLinkClass} prefetch={false}>
            Explained
          </Link>
          <Link href="/contact" className={navLinkClass} prefetch={false}>
            Contact
          </Link>
          <Button asChild className={accentButtonClass}>
            <Link href="#quiz">Take Quiz</Link>
          </Button>
        </nav>
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-foreground hover:text-accent"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background shadow-md py-4 absolute top-20 left-0 right-0 z-40 border-b border-foreground">
          <nav className="flex flex-col items-center gap-4">
            <Link
              href="#how-it-works"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
              prefetch={false}
            >
              How It Works
            </Link>
            <Link href="/system" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)} prefetch={false}>
              System
            </Link>
            <Link
              href="/raise-score-explained"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
              prefetch={false}
            >
              Explained
            </Link>
            <Link href="/contact" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)} prefetch={false}>
              Contact
            </Link>
            <Button asChild className={`${accentButtonClass} w-4/5 mt-2`} onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="#quiz">Take the Quiz</Link>
            </Button>
          </nav>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center py-20 md:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tightest text-foreground leading-none">
                WHAT’S
                <br />
                YOUR
                <br />
                RAISE
                <br />
                SCORE™?
              </h1>
              <p className="mt-6 text-base md:text-lg text-foreground/80 max-w-md">
                The first-ever fundability scorecard for startups. Discover your fundraising potential in 5 minutes.
              </p>
              <div className="mt-10">
                <Button asChild size="lg" className={`${accentButtonClass} px-8 py-6 text-sm group`}>
                  <Link href="#quiz">
                    Take the Free Quiz{" "}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center relative min-h-[300px]">
              <svg
                viewBox="0 0 200 200"
                className="w-full max-w-md h-auto opacity-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0ZM100 20C144.183 20 180 55.8172 180 100C180 144.183 144.183 180 100 180C55.8172 180 20 144.183 20 100C20 55.8172 55.8172 20 100 20Z"
                  fill="currentColor"
                />
              </svg>
              <p className="absolute bottom-0 right-0 text-xs uppercase text-foreground/50">RS-001 MODEL</p>
            </div>
          </div>
        </section>

        {/* What is Raise Score Section */}
        <section id="how-it-works" className="w-full py-16 md:py-24 border-t border-b border-foreground">
          <div className="container px-4 md:px-6">
            <div className="text-left md:text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                THE FICO SCORE FOR STARTUP FUNDRAISING
              </h2>
              <p className="mt-4 text-foreground/70 md:text-base">
                Investors are quietly evaluating you. Now you can score yourself first.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {[
                { icon: Users, title: "Team Credibility" },
                { icon: Lightbulb, title: "Product Clarity" },
                { icon: Target, title: "Market Size (TAM)" },
                { icon: TrendingUp, title: "Go-To-Market Plan" },
                { icon: BarChart, title: "Financial Model" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 border border-foreground text-center hover:bg-muted transition-colors"
                >
                  <item.icon className="w-10 h-10 text-accent mb-4 mx-auto" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW: Expert-Driven, AI-Powered Section */}
        <section id="expertise-ai" className="w-full py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                Expert-Driven, AI-Powered Precision
              </h2>
              <p className="mt-4 text-foreground/70 md:text-base">
                Our system combines deep human insight with cutting-edge technology to give you an unparalleled
                advantage in your fundraising journey.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="p-6 border border-foreground/20 bg-background hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <UsersRound className="w-10 h-10 text-accent mr-4" />
                  <h3 className="text-2xl font-bold text-foreground">Human Expertise at Scale</h3>
                </div>
                <p className="text-foreground/80 text-sm">
                  Our team comprises seasoned experts who have meticulously reviewed thousands of funding applications
                  from startups across a multitude of sectors. This vast experience allows us to understand the nuanced
                  patterns of successful pitches and common pitfalls to avoid. We bring real-world investor perspectives
                  directly into our scoring and guidance.
                </p>
              </div>
              <div className="p-6 border border-foreground/20 bg-background hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <Cpu className="w-10 h-10 text-accent mr-4" />
                  <h3 className="text-2xl font-bold text-foreground">AI-Enhanced Customization</h3>
                </div>
                <p className="text-foreground/80 text-sm">
                  We leverage advanced AI technology to analyze your specific inputs and compare them against our
                  extensive database of successful fundraising patterns. This allows us to create a highly customized
                  system and personalized roadmap, tailored to the unique needs, industry, and stage of any startup or
                  founder seeking funding. It's not just a score; it's intelligent guidance.
                </p>
              </div>
            </div>
            <p className="mt-12 text-center text-lg text-foreground/90 max-w-2xl mx-auto">
              This powerful synergy ensures your Raise Score™ is not only accurate but also actionable, providing you
              with the precise insights needed to elevate your fundability.
            </p>
          </div>
        </section>

        {/* Interactive Quiz Section */}
        <section id="quiz" className="w-full py-16 md:py-24 bg-foreground text-background">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">🚀 HOW FUNDABLE ARE YOU?</h2>
              <p className="mt-4 text-background/70 md:text-base">
                Answer 10 quick questions. Get your Raise Score™. Unlock a custom roadmap to get funded.
              </p>
            </div>
            <InteractiveQuiz />
          </div>
        </section>

        {/* What's in the Report Section (id="report" is the pricing section) */}
        <section id="report" className="w-full py-16 md:py-24 border-t border-b border-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                  YOUR PERSONALIZED FUNDABILITY AUDIT
                </h2>
                <p className="mt-4 text-foreground/70 md:text-base max-w-md">
                  For just $150, receive a comprehensive analysis to guide your fundraising strategy.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "40-POINT STARTUP AUDIT (HUMAN + AI REVIEWED)",
                    "FULL RAISE SCORE (0–100) WITH BREAKDOWNS",
                    "PERSONALIZED 'RAISE ROADMAP™'",
                    "15-MIN STRATEGIST CALL TO REVIEW RESULTS",
                    "FOUNDER RESOURCES & NEXT STEPS ACCESS",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm uppercase tracking-wide text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-foreground text-background p-8 md:p-12 text-center">
                <p className="text-sm uppercase tracking-wider text-background/70">One-time payment</p>
                <p className="text-7xl font-black my-2 text-accent">$150</p>
                <Button asChild size="lg" className={`${accentButtonClass} w-full mt-6 text-base py-4`}>
                  <Link href="#">
                    GET MY REPORT NOW <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 border-t border-b border-foreground">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-black text-center tracking-tighter">FROM FOUNDERS LIKE YOU</h2>
            <div className="mt-10">
              <TestimonialCarousel />
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-16 md:py-24 border-t border-b border-foreground">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter">SCORED LOW? LET’S FIX IT.</h2>
              <p className="mt-4 text-foreground/70 md:text-base">
                Our team offers high-impact services to boost your fundability.
              </p>
            </div>
            <div className="mt-12 grid gap-px md:grid-cols-3 bg-foreground border border-foreground">
              {[
                { icon: FileText, title: "Pitch Deck Makeovers" },
                { icon: BarChart, title: "Financial Model Overhaul" },
                { icon: BrainCircuit, title: "Investor Narrative Coaching" },
                { icon: Briefcase, title: "Data Room Setup" },
                { icon: Handshake, title: "Warm Intro Concierge" },
                { icon: CheckCircle, title: "Fundraising Strategy" },
              ].map((service) => (
                <div
                  key={service.title}
                  className="bg-background p-6 text-center group hover:bg-muted transition-colors"
                >
                  <service.icon className="w-10 h-10 text-accent mb-4 mx-auto transition-transform group-hover:scale-110" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{service.title}</h3>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className={`${buttonClass} border-2 hover:text-accent hover:border-accent px-8 py-3 text-sm group`}
              >
                <Link href="/system">
                  Explore System <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 bg-accent text-accent-foreground">
          <div className="container text-center px-4 md:px-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              YOUR INVESTORS ARE WATCHING. GET FUNDABLE.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-accent-foreground/80">
              Take the quiz. Get your Raise Score. Close your next round with confidence.
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className={`${buttonClass} bg-accent-foreground text-accent hover:bg-opacity-90 px-10 py-7 text-base group`}
              >
                <Link href="#quiz">
                  🚀 TAKE THE FREE QUIZ NOW{" "}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
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
