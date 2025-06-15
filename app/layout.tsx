import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider" // Uncomment if you set up next-themes

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://raisescore.vercel.app"),
  title: {
    default: "Raise Score™ - Discover Your Startup's Fundability",
    template: "%s | Raise Score™",
  },
  description:
    "Take our 10-question quiz to get your Raise Score™ and discover how ready your startup is for funding. AI-powered assessment for entrepreneurs seeking investment.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
    shortcut: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" }
    ],
  },
  openGraph: {
    title: "Raise Score™ - Discover Your Startup's Fundability",
    description: "Take our 10-question quiz to get your Raise Score™. AI-powered assessment for entrepreneurs seeking investment. What's your fundability score?",
    url: "https://raisescore.vercel.app",
    siteName: "Raise Score™",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Raise Score™ - Discover Your Startup's Fundability",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raise Score™ - Discover Your Startup's Fundability",
    description: "Take our 10-question quiz to get your Raise Score™. AI-powered assessment for entrepreneurs seeking investment.",
    images: [
      {
        url: "/og-image.png",
        alt: "Raise Score™ - Discover Your Startup's Fundability",
      },
    ],
  },
  applicationName: "Raise Score™",
  keywords: [
    "startup funding", 
    "fundraising", 
    "investment readiness", 
    "fundability assessment", 
    "startup quiz", 
    "entrepreneur", 
    "venture capital", 
    "seed funding", 
    "Series A", 
    "pitch deck", 
    "business plan",
    "raise score"
  ],
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
  authors: [{ name: "Raise Score Team" }],
  creator: "Raise Score™",
  publisher: "Raise Score™",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/icon.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#14b8a6" />
        {/* Open Graph and Twitter preview imagery */}
        <link rel="image_src" href="/og-image.png" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Raise Score™ - Discover Your Startup's Fundability" />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
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
