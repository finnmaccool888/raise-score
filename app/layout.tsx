import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider" // Uncomment if you set up next-themes

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://raisescore.ai"),
  title: {
    default: "RaiseScore.ai - Elevate Your Digital Presence",
    template: "%s | RaiseScore.ai",
  },
  description:
    "Unlock insights and optimize your online strategy with RaiseScore.ai. AI-powered analytics and tools to boost your score.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "RaiseScore.ai - Elevate Your Digital Presence",
    description: "Unlock insights and optimize your online strategy with RaiseScore.ai.",
    url: "https://raisescore.ai",
    siteName: "RaiseScore.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RaiseScore.ai - AI-Powered Analytics and Optimization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RaiseScore.ai - Elevate Your Digital Presence",
    description: "Unlock insights and optimize your online strategy with RaiseScore.ai.",
    images: ["/og-image.png"],
  },
  applicationName: "RaiseScore.ai",
  keywords: ["AI", "analytics", "digital presence", "SEO", "optimization", "score improvement", "raisescore"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }, // Your globals.css uses #000000 for dark bg
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        {/* If using next-themes:
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        */}
        {children}
      </body>
    </html>
  )
}
