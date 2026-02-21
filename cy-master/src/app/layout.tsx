import "./globals.css";
import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import AnimatedFavicon from "../components/AnimatedFavicon";

// Global metadata (tab heading + description etc.)
export const metadata: Metadata = {
  title: {
    default: "GS1 PK Online",
    template: "%s | GS1 PK Online", // Allows page-specific titles
  },
     icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }, // Fallback
    ],
    apple: '/apple-touch-icon.png', // iOS devices ke liye
  },
  description: "GS1 Pakistan - Global Standards for Business",
  keywords: ["GS1", "Pakistan", "barcodes", "standards", "business"],
  authors: [{ name: "GS1 Pakistan" }],
  creator: "GS1 Pakistan",
  publisher: "GS1 Pakistan",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "GS1 PK Online",
    description: "GS1 Pakistan - Global Standards for Business",
    siteName: "GS1 PK Online",
  },
  twitter: {
    card: "summary_large_image",
    title: "GS1 PK Online",
    description: "GS1 Pakistan - Global Standards for Business",
  },
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
};

// Viewport configuration (separate export as required by Next.js)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased"><AnimatedFavicon />{children}</body>
    </html>
  );
}