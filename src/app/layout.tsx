import type { Metadata, Viewport } from "next";
import { Advent_Pro, Itim } from "next/font/google";

import { siteConfig } from "@/config/site";

import "./globals.css";

const adventPro = Advent_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-advent-pro",
  display: "swap",
});

const itim = Itim({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-itim",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${adventPro.variable} ${itim.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
