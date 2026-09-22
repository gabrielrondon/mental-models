import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Newsreader } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", style: ["italic", "normal"], display: "swap" });

const SITE = "https://mentalmodels.tuturama.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "The Mental Models Latticework",
  description:
    "An open-source decision-support system and AI reasoning engine: 50 foundational mental models synthesized across physics, economics, evolutionary biology and cognition, with diagnostic checklists, case studies, a knowledge graph, MCP server and Anki deck.",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Mental Models Latticework",
    title: "The Mental Models Latticework",
    description: "50 foundational mental models for human decision-making and AI agents. Open source, MIT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Mental Models Latticework" }],
  },
  twitter: { card: "summary_large_image", title: "The Mental Models Latticework", description: "50 foundational mental models for humans and AI agents. Open source.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#070a12", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable} ${serif.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
