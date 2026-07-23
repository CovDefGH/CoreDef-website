import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { GlobalHomepageBlur } from "@/components/ui/GlobalHomepageBlur";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "Core Defenses | Data Analytics for Critical Infrastructure";
const description =
  "Data analytics and secure communications for nuclear, energy, defense, and industrial operations. Home of EDIM and ENADOX.";

export const metadata: Metadata = {
  metadataBase: new URL("https://core-defenses.com"),
  title: {
    default: title,
    template: "%s | Core Defenses",
  },
  description,
  verification: { google: "UuTw9cncG44EELkIwHlPGDlYQkfcboqEc-ZJQ-rc2x4" },
  openGraph: {
    title,
    description,
    siteName: "Core Defenses",
    type: "website",
    images: ["/hero-poster.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero-poster.jpg"],
  },
};

// viewport-fit=cover: lets the hero bleed under the Dynamic Island/status bar
// and lets env(safe-area-inset-*) resolve to real device insets instead of 0.
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} relative font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Core Defenses",
              url: "https://core-defenses.com",
              logo: "https://core-defenses.com/logo.png",
              description,
              email: "info@core-defenses.com",
            }),
          }}
        />
        {/* Warms the connection for the Contact page's Google Maps iframe embed */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <a
          href="#main"
          className="focus:bg-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll>
            <GlobalHomepageBlur />
            <NavBar />
            <main
              id="main"
              className="bg-surface relative pt-[calc(4rem_+_env(safe-area-inset-top))]"
            >
              {children}
            </main>
            <ScrollToTop />
            <Footer />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
