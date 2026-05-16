import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const runtime = "edge";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stepfault | MAPOS · Interim CTO & Deep-Tech R&D",
  description:
    "Principal-led architecture and R&D for AI, bioinformatics, and compliance-heavy systems—deterministic MAPOS-style orchestration, reference trace on site; interim CTO and institutional engagements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-black text-zinc-200 antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
