import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { Chatbot } from "@/components/chatbot";

export const metadata: Metadata = {
  metadataBase: new URL('https://youtubeseo.app'),
  title: {
    default: "Best YouTube SEO Tool for Keywords, Tags & Video Ranking",
    template: "%s | YouTube SEO Tool"
  },
  description: "AI-Powered YouTube SEO Tool to grow your channel faster. Free keyword research, tag generator, title optimizer, and video analyzer.",
  keywords: [
    'youtube seo tools',
    'free youtube tag generator',
    'youtube keyword research',
    'youtube seo score checker',
    'ai title generator',
    'youtube description generator',
    'trending youtube video ideas',
    'channel analyzer',
    'rank youtube videos fast',
    'vidIQ alternative',
    'best youtube seo tool'
  ],
  authors: [{ name: 'YouTube SEO Tool Team' }],
  creator: 'YouTube SEO Tool',
  publisher: 'YouTube SEO Tool',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://youtubeseo.app',
    siteName: 'YouTube SEO Tool',
    title: 'Best YouTube SEO Tool for Keywords, Tags & Video Ranking',
    description: 'AI-Powered YouTube SEO Tool to grow your channel faster. Free keyword research, tag generator, title optimizer, and video analyzer.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'YouTube SEO Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best YouTube SEO Tool for Keywords, Tags & Video Ranking',
    description: 'AI-Powered YouTube SEO Tool to grow your channel faster.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system" storageKey="yt-seo-theme">
          <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />
          {children}
          <Chatbot />
          <VisualEditsMessenger />
        </ThemeProvider>
      </body>
    </html>
  );
}