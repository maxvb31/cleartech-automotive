'use client'

import { useRef, useState } from 'react'
import Button from '../Button'
import { LargeProductShowcaseSection } from '@/types'
import { PortableText } from '@portabletext/react'

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
      <div className="container"></div>
    </section>
  )
}

export default LargeProductShowcase
