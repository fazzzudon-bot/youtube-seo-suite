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
  description: "AI-Powered YouTube SEO Tool to grow your channel faster. Free keyword research, tag generator, title optimizer, and video analyzer. Built by creators, for creators.",
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
    'best youtube seo tool',
    'youtube analytics tool',
    'youtube growth tool',
    'video optimization tool',
    'youtube ranking tool'
  ],
  authors: [{ name: 'YouTube SEO Tool Team' }],
  creator: 'YouTube SEO Tool',
  publisher: 'YouTube SEO Tool',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
        alt: 'YouTube SEO Tool - AI-Powered Growth Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best YouTube SEO Tool for Keywords, Tags & Video Ranking',
    description: 'AI-Powered YouTube SEO Tool to grow your channel faster.',
    images: ['/og-image.jpg'],
    creator: '@youtubeseotool'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://youtubeseo.app'
  },
  category: 'Technology',
  classification: 'YouTube SEO Tools',
  verification: {
    google: 'sy4s2Krs1RV4xdlz396D_Pn7lI2EJla46xBQKQ58lhU'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="YouTube SEO Tool" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#6366f1" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Web Application Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system" storageKey="yt-seo-theme">
          <ErrorReporter />
          
          {/* Google Analytics - Replace with your actual GA ID */}
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          
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