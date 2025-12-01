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
    default: "Free YouTube SEO Tool - Keyword Research, Tag Generator, Video Ideas & Trending Topics",
    template: "%s | YouTube SEO Tool"
  },
  description: "Try it free! AI-powered YouTube SEO tool with keyword research, tag generator, trending topics finder, and video ideas. Rank faster with our free title optimizer and description generator.",
  keywords: [
    'youtube seo tool',
    'youtube seo',
    'seo tool',
    'free youtube tag generator',
    'tag generator',
    'youtube keyword research',
    'keyword research',
    'trending topics',
    'video ideas',
    'youtube seo score checker',
    'ai title generator',
    'youtube description generator',
    'trending youtube video ideas',
    'rank youtube videos fast',
    'vidIQ alternative',
    'best youtube seo tool',
    'youtube analytics tool',
    'youtube growth tool',
    'video optimization tool',
    'youtube ranking tool',
    'try it free',
    'free youtube tools'
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
    title: 'Free YouTube SEO Tool - Keyword Research, Tag Generator, Video Ideas & Trending Topics',
    description: 'Try it free! AI-powered YouTube SEO tool with keyword research, tag generator, trending topics finder, and video ideas. Rank faster with our free optimization tools.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'YouTube SEO Tool - Free AI-Powered Keyword Research & Tag Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube SEO Tool - Keyword Research, Tag Generator & Video Ideas',
    description: 'Try it free! AI-powered keyword research, tag generator, trending topics, and video ideas to rank your YouTube videos faster.',
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
    google: 'HSByG_UFa-tIkTg4Ccfl6dESrWHicd1IHxgJQVchHoc'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Canonical URL - Critical for SEO */}
        <link rel="canonical" href="https://youtubeseo.app" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="YouTube SEO Tool" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#6366f1" />
        
        {/* Preconnect to important domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Web Application Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system" storageKey="yt-seo-theme">
          <ErrorReporter />
          
          {/* Google Analytics 4 */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true,
                  anonymize_ip: true
                });
              `,
            }}
          />

          {/* Facebook Pixel (Optional) */}
          {FB_PIXEL_ID && (
            <>
              <Script
                id="facebook-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${FB_PIXEL_ID}');
                    fbq('track', 'PageView');
                  `,
                }}
              />
              <noscript>
                <img
                  height="1"
                  width="1"
                  style={{ display: 'none' }}
                  src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                  alt=""
                />
              </noscript>
            </>
          )}
          
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