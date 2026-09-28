import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

// Biro Script by ingoFonts: the handwritten titles of the process stages on the homepage.
const script = localFont({
  src: "./fonts/BiroScript.otf",
  variable: "--font-biro",
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
