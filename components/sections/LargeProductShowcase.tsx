'use client'

import { useRef, useState } from 'react'
import Button from '../Button'
import { LargeProductShowcaseSection } from '@/types'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/urlForImage'

interface LargeProductShowcaseProps extends LargeProductShowcaseSection {}

export function LargeProductShowcase({
  tagline,
  title,
  product,
  buttons,
}: LargeProductShowcaseProps) {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const buttonsRef = useRef<HTMLDivElement | null>(null)

  return (
    <section
      id="large-product-showcase-section"
      ref={heroRef}
      className="bg-[#171717]"
    >
      <div className="container">
        <div className="flex flex-col items-center py-20 gap-2">
          {/* Tagline */}
          <p className="text-md text-center text-white/80">{tagline}</p>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl text-center text-white uppercase font-michroma max-w-[15ch]">
            {title}
          </h2>

          {/* Product Image */}
          <div className="w-full max-w-xl mx-auto">
            <img
              src={urlForImage(product).url()}
              alt={product.alt || title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-4 justify-center">
            {buttons?.map((button, i) => <Button key={i} {...button} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LargeProductShowcase
