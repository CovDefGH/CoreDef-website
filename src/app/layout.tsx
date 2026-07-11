import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Core Defenses — Data Analytics for Critical Infrastructure",
    template: "%s — Core Defenses",
  },
  description:
    "Advanced data analytics for critical infrastructure, backed by secure communications for mission-critical operations. Home of EDIM and ENADOX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <a
          href="#main"
          className="focus:bg-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <NavBar />
        <main id="main" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
