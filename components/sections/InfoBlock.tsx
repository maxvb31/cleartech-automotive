'use client'

import { useRef } from 'react'
import { InfoBlock as InfoBlockType } from '@/types'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/urlForImage'

interface InfoBlockProps extends InfoBlockType {}

export function InfoBlock({ title, overview, image }: InfoBlockProps) {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)

  return (
    <section id="info-block-section" className="bg-[#171717] py-16 md:py-24">
      <div className="container mx-auto py-12">
        {image && (
          <div className="mb-10 md:mb-16 max-w-4xl mx-auto">
            <img
              src={urlForImage(image)?.url()}
              alt={image.alt || title}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {title && (
            <h2
              ref={titleRef}
              className="text-4xl font-michroma md:text-5xl uppercase mb-6 text-white text-left"
            >
              {title}
            </h2>
          )}

          {overview && (
            <div className="text-white text-base md:text-lg text-left">
              <PortableText value={overview} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default InfoBlock
