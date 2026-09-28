import type { Metadata } from "next";
import { Inter, Reenie_Beanie } from "next/font/google";
import localFont from "next/font/local";
import { person } from "@/content/site";
import InkCursor from "@/components/InkCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Botch by HVNTER (hvnter.net): heavy, blobby display face for "PORTFOLIO" (capitals)
// and, in lowercase, the secondary lettering: section notes, cover asides and the cursor's thoughts.
const display = localFont({
  src: "./fonts/Botch.otf",
  variable: "--font-botch",
  display: "swap",
});

// Reenie Beanie (Google Fonts, free for web use): the handwritten notes, labels and asides.
const script = Reenie_Beanie({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${person.firstName} ${person.lastName} — Portfolio`,
  description: `${person.firstName} ${person.lastName} ${person.intro}`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${script.variable}`}>
      <body className="min-h-svh bg-paper font-sans text-ink">
        {children}
        <InkCursor />
      </body>
    </html>
  );
}
