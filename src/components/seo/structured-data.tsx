import { wrapJsonLd } from "@/lib/seo/structured-data"

interface StructuredDataProps {
  data: any
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={wrapJsonLd(data)}
    />
  )
}
