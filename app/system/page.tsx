import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  TargetIcon,
  TrendingUp,
  Award,
  Star,
  BrainCircuit,
  BarChartBig,
} from "lucide-react"

const packages = [
  {
    id: "backer-kit",
    name: "The “Backable Founder” Kit",
    price: "$3,500",
    bestFor: "Solo founders raising pre-seed or angel funding",
    goal: "Make the founder investable",
    icon: Sparkles,
    features: [
      "Personal branding audit + 2-week content plan",
      "Founder origin story script + polished bio",
      "1 filmed founder pitch video (1 min)",
      "LinkedIn & Twitter setup + optimization",
      "Cold DM + warm intro messaging templates",
      "Mini-deck polish (10-slide pitch review)",
    ],
  },
  {
    id: "seed-boost",
    name: "The “Seed Round Signal Boost” Pack",
    price: "$7,500",
    bestFor: "Startups prepping for Seed or early-stage pitch week",
    goal: "Maximize awareness + clarity during active raise",
    icon: Zap,
    features: [
      "Custom pitch deck w/ narrative consulting",
      "90-sec cinematic startup story video",
      "Landing page or Notion-style investor room",
      "Brand visual refresh (colors, logo tweaks, slide templates)",
      "Intro email copy + investor FAQ doc",
      "Media list of 50 early-stage reporters + 2 press angles",
      "Light PR outreach (3 emails to curated press)",
    ],
  },
  {
    id: "demo-dominator",
    name: "The “Demo Day Dominator” Suite",
    price: "$12,000",
    bestFor: "YC-style accelerators or timed Seed raise",
    goal: "Crush demo day and post-event deal flow",
    icon: TargetIcon,
    features: [
      "On-camera founder coaching + 1:1 feedback",
      "Deck writing + visual design + narrative coaching",
      "Live pitch script + video rehearsal",
      "3 Social teasers (motion graphics + clips)",
      "Coordinated email/PR blast",
      "Press kit + 1 written founder op-ed ghostwritten",
      "1-pager + FAQ sheet for investor follow-up",
    ],
  },
  {
    id: "series-a-engine",
    name: "The “Series A Momentum Engine”",
    price: "$25,000",
    bestFor: "Revenue-stage companies preparing a Series A",
    goal: "Build a strong growth narrative and momentum to close institutional checks",
    icon: TrendingUp,
    features: [
      "Growth story strategy + proof point mapping",
      "Founder media training + thought leadership ghostwriting (2 articles)",
      "PR campaign (1 month retainer: intro, press release, 10 pitches)",
      "Custom founder documentary short (3-min)",
      "Full website copy refresh w/ investor angle",
      "Metrics teardown deck (narrative-led growth slides)",
      "Outreach campaign setup (email + intro messaging)",
    ],
  },
  {
    id: "flywheel-retainer",
    name: "The “Fundraising Flywheel” Retainer",
    price: "$8,000/mo (3-month min)",
    bestFor: "Companies raising in tranches or managing a rolling raise",
    goal: "Maintain a consistent pipeline of investor interest and media coverage",
    icon: Award,
    features: [
      "Narrative strategy calls + live feedback",
      "Ongoing investor pitch tweaks",
      "Social content & founder ghostwriting (4 posts/mo)",
      "PR support (1 announcement or feature pitch/mo)",
      "Design support (1-pager, updates, visuals)",
      "Targeted outreach campaigns (investors + media)",
    ],
  },
  {
    id: "unicorn-suite",
    name: "The “Next Unicorn” Power Suite",
    price: "$50,000",
    bestFor: "Growth-stage startups raising $10M+ and needing serious narrative firepower",
    goal: "Get press, impress top-tier funds, and own the narrative",
    icon: Star,
    features: [
      "Investor narrative workshop + materials",
      "Full rebrand or visual identity upgrade",
      "Premium brand film (2-3 min cinematic video)",
      "Fundraising funnel strategy + landing pages",
      "Data room UX + doc design support",
      "Custom PR campaign (with 2 months of support)",
      "Founder docuseries: 2 videos (your story + why now)",
      "Ops: Fundraise tracking dashboard setup + CRM tagging",
      "Ghostwritten founder memo & open letter",
    ],
  },
]

export default function SystemPage() {
  const accentButtonClass =
    "bg-accent text-accent-foreground hover:bg-opacity-80 border border-accent transition-all duration-300 text-xs uppercase tracking-widest py-3 px-6"

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
        {/* Hero Section - Explaining the Raise Score System */}
        <section className="w-full py-20 md:py-32 bg-foreground text-background text-center">
          <div className="container px-4 md:px-6">
            <BrainCircuit className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tightest text-accent leading-tight">
              The Raise Score™ System
            </h1>
            <p className="mt-6 text-lg md:text-xl text-background/80 max-w-3xl mx-auto">
              Unlock your startup's true fundraising potential. The Raise Score™ System isn't just a number; it's a
              comprehensive diagnostic and strategic framework designed to make your venture irresistible to investors.
              We pinpoint your strengths, uncover hidden weaknesses, and provide a clear roadmap to elevate your
              fundability.
            </p>
            <p className="mt-4 text-base md:text-lg text-background/70 max-w-2xl mx-auto">
              Stop guessing what investors want. Start building a compelling case with data-driven insights and
              expert-led execution.
            </p>
          </div>
        </section>

        {/* What the System Addresses Section */}
        <section className="w-full py-16 md:py-24 border-b border-foreground">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                From Uncertainty to Unstoppable
              </h2>
              <p className="mt-4 text-foreground/70 md:text-base">
                Our system demystifies the fundraising process, transforming key areas of your startup:
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center p-6">
                <Sparkles className="w-12 h-12 text-accent mb-4 mx-auto" />
                <h3 className="text-xl font-semibold uppercase tracking-wider text-foreground">Founder Narrative</h3>
                <p className="text-sm text-foreground/70 mt-1">Craft a story that makes you undeniably backable.</p>
              </div>
              <div className="text-center p-6">
                <BarChartBig className="w-12 h-12 text-accent mb-4 mx-auto" />
                <h3 className="text-xl font-semibold uppercase tracking-wider text-foreground">Traction & Metrics</h3>
                <p className="text-sm text-foreground/70 mt-1">
                  Translate your numbers into a compelling growth story.
                </p>
              </div>
              <div className="text-center p-6">
                <Zap className="w-12 h-12 text-accent mb-4 mx-auto" />
                <h3 className="text-xl font-semibold uppercase tracking-wider text-foreground">Pitch & Presence</h3>
                <p className="text-sm text-foreground/70 mt-1">
                  Deliver a pitch that resonates and commands attention.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investor Magnet Packages Section */}
        <section className="w-full py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                Investor Magnet Packages
              </h2>
              <p className="mt-4 text-foreground/70 md:text-base">
                Turn your startup into a story worth funding. Choose the package that aligns with your current stage and
                fundraising goals.
              </p>
            </div>

            <div className="grid gap-12 lg:gap-16">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-8 md:p-10 border border-foreground/20 shadow-lg transition-all hover:shadow-2xl hover:border-accent group bg-background"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-6">
                    <pkg.icon className="w-12 h-12 text-accent mb-4 md:mb-0 flex-shrink-0" />
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground group-hover:text-accent transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="text-2xl font-bold text-accent mt-1">{pkg.price}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                    <div>
                      <h4 className="text-lg uppercase tracking-wider font-semibold text-foreground mb-1">Best for:</h4>
                      <p className="text-foreground/90 text-lg">{pkg.bestFor}</p>
                    </div>
                    <div>
                      <h4 className="text-lg uppercase tracking-wider font-semibold text-foreground mb-1">Goal:</h4>
                      <p className="text-foreground/90 text-lg">{pkg.goal}</p>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold uppercase tracking-wider text-foreground mb-3">Includes:</h4>
                  <ul className="space-y-2 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`${accentButtonClass} w-full sm:w-auto group text-sm py-3`}>
                    <Link href={`/contact?package=${pkg.id}&packageName=${encodeURIComponent(pkg.name)}`}>
                      Inquire About {pkg.name}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-20 md:py-32 bg-accent text-accent-foreground">
          <div className="container text-center px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Ready to Transform Your Fundraising?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-accent-foreground/80">
              Don't leave your funding to chance. Partner with Raise Score™ and equip your startup with the narrative,
              strategy, and assets to attract investors and close your round.
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-accent-foreground text-accent hover:bg-opacity-90 px-10 py-7 text-base group border-2 border-accent-foreground hover:border-accent-foreground/70"
              >
                <Link href="/contact">
                  Discuss Your Needs
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
