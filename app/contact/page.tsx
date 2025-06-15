"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Script from "next/script"

// It's good practice to declare global modifications if Tally script adds to window
declare global {
  interface Window {
    Tally: {
      loadEmbeds: () => void
      // Add other Tally methods or properties if known
    }
  }
}

export default function ContactPage() {
  const searchParams = useSearchParams()
  const [tallyFormSrc, setTallyFormSrc] = useState("")

  const TALLY_FORM_ID = "wgx8LN"
  const TALLY_FORM_BASE_URL = `https://tally.so/embed/${TALLY_FORM_ID}`

  // **IMPORTANT**: Update these if your hidden field names in Tally are different
  const TALLY_PARAM_PACKAGE_NAME = "packageName" // Assumed Tally hidden field name
  const TALLY_PARAM_PACKAGE_ID = "packageId" // Assumed Tally hidden field name

  useEffect(() => {
    const inquiryPackageName = searchParams.get("packageName")
    const inquiryPackageId = searchParams.get("package")

    // Base options from your Tally embed code
    let src = `${TALLY_FORM_BASE_URL}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`

    if (inquiryPackageName) {
      src += `&${TALLY_PARAM_PACKAGE_NAME}=${encodeURIComponent(inquiryPackageName)}`
    }
    if (inquiryPackageId) {
      src += `&${TALLY_PARAM_PACKAGE_ID}=${encodeURIComponent(inquiryPackageId)}`
    }
    // You can add other Tally supported query params here if needed
    // e.g., &customFont=Inter (if Tally supports it this way for embeds)

    setTallyFormSrc(src)
  }, [searchParams])

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="px-4 md:px-8 h-20 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <span className="text-2xl font-black tracking-tightest text-foreground">RAISE SCORE™</span>
        </Link>
        <Button
          asChild
          variant="outline"
          className="text-xs uppercase tracking-widest hover:text-accent hover:border-accent"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tightest text-foreground leading-none mb-8">
          CONTACT US
        </h1>
        <p className="text-lg text-foreground/80 max-w-xl mb-10">
          Have questions about our services or want to discuss your startup's fundability? We're here to help.
        </p>
        {tallyFormSrc && (
          <div className="w-full max-w-2xl mx-auto">
            <iframe
              data-tally-src={tallyFormSrc} // Use data-tally-src for the script to pick up
              // src will be set by Tally's script if not already set or if it needs to update
              loading="lazy"
              width="100%"
              height="439" // Initial height from your Tally embed code
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Raise Score Form Website" // Title from your Tally embed code
              className="rounded-none"
            ></iframe>
          </div>
        )}
        <Script
          id="tally-embed-loader-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var d = document;
                var wUrl = "https://tally.so/widgets/embed.js";
                var v = function() {
                  if (typeof Tally !== "undefined") {
                    Tally.loadEmbeds();
                  } else {
                    d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach(function(e) {
                      e.src = e.dataset.tallySrc;
                    });
                  }
                };
                if (typeof Tally !== "undefined") {
                  v();
                } else if (d.querySelector('script[src="' + wUrl + '"]') === null) {
                  var s = d.createElement("script");
                  s.src = wUrl;
                  s.onload = v;
                  s.onerror = v;
                  d.body.appendChild(s);
                }
              })();
            `,
          }}
        />
        <p className="mt-12 text-sm text-foreground/60">
          Alternatively, you can email us directly at{" "}
          <a href="mailto:hello@raisescore.example.com" className="text-accent hover:underline">
            hello@raisescore.example.com
          </a>
        </p>
      </main>
      <footer className="bg-foreground text-background/70 py-8 border-t border-background/20">
        <div className="container px-4 md:px-6 text-center text-xs uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Raise Score. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
