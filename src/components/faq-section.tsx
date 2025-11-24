"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is YouTube SEO and why is it important?",
    answer: "YouTube SEO is the process of optimizing your videos, channel, and playlists to rank higher in YouTube's search results and recommendations. It's crucial for channel growth as it helps your content reach more viewers organically, increasing views, subscribers, and engagement without paid advertising."
  },
  {
    question: "How does this YouTube SEO tool help me grow my channel?",
    answer: "Our AI-powered tool helps you find the best keywords, generate optimized tags, create viral titles, write SEO-friendly descriptions, and analyze your competition - all for free. We provide data-driven insights to help you make informed decisions about your content strategy and maximize your video's ranking potential."
  },
  {
    question: "Is this tool really completely free to use?",
    answer: "Yes! All our core features are 100% free to use. No credit card required, no hidden fees, and no premium upsells. We believe in helping creators grow their channels with powerful AI-driven SEO tools accessible to everyone."
  },
  {
    question: "Do I need to create an account or login to use the tools?",
    answer: "No login required for any features! You can use keyword research, tag generator, title generator, description generator, and all other tools immediately without creating an account. Just visit any tool page and start optimizing your content right away."
  },
  {
    question: "How accurate is the keyword difficulty score?",
    answer: "Our keyword difficulty scores are powered by advanced AI analysis combined with real YouTube search data. We analyze competition levels, search volume patterns, and ranking factors to provide you with accurate difficulty estimates. While no tool is 100% perfect, our AI continuously learns and improves its predictions."
  },
  {
    question: "How often should I use these SEO tools?",
    answer: "For best results, use keyword research before creating each video to find high-opportunity topics. Generate optimized titles, tags, and descriptions for every upload. Check trending topics regularly to stay ahead of trends and continuously improve your content strategy."
  },
  {
    question: "What makes this tool better than alternatives like vidIQ or TubeBuddy?",
    answer: "Our tool is completely free with no feature limitations, uses cutting-edge AI (Gemini) for more accurate insights, requires no account creation or login, and provides a clean, fast interface focused on essential SEO features. We prioritize simplicity and effectiveness over overwhelming features."
  }
]

export function FAQSection() {
  return (
    <section className="border-t px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground px-4">
            Everything you need to know about our YouTube SEO tools
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-sm sm:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}