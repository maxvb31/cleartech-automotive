import { TextSection as TextSectionType } from '@/types'
import TextContent from '../shared/TextContent'

interface TextSectionProps {
  section: TextSectionType
  className?: string
}

export default function TextSection({
  section,
  className = '',
}: TextSectionProps) {
  const { heading, textContent } = section

  return (
    <section className={`text-section py-12 md:py-20 ${className}`}>
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="text-section-heading text-3xl font-bold mb-8">
            {heading}
          </h2>
        )}

        <TextContent content={textContent} />
      </div>
    </section>
  )
}
