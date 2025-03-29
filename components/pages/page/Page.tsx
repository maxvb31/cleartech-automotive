'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { Header } from '@/components/shared/Header'
import { Hero } from '@/components/sections/Hero'
import TextSection from '@/components/sections/TextSection'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  const { title, overview, sections } = data ?? {}

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    // Check if the window size is large or extra-large
    const isLargeScreen = window.innerWidth >= 1024 // Adjust the breakpoint as needed

    let lenis
    if (isLargeScreen) {
      lenis = new Lenis({
        duration: 0.3, // Adjust duration for smoother scroll
        easing: (t) => 1 - Math.pow(1 - t, 2.5), // Adjust easing for natural scrolling
        // smooth: true, // Removed as it's not a valid property
        // smoothTouch: false, // Removed as it's not a valid property
      })

      // Request animation frame to ensure smoothness
      const raf = (time: number) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      return () => lenis.destroy() // Cleanup Lenis on unmount
    }
  }, [])

  useEffect(() => {
    // Scroll to the top when `data` or `sections` change
    window.scrollTo(0, 0)
  }, [data, sections])

  return (
    <div>
      <div className="mb-14">
        {/* Header */}
        {/* <Header title={title} description={overview} /> */}

        {/* Sections */}
        {sections?.map((section: any, index: number) => {
          switch (section._type) {
            case 'hero':
              return <Hero key={index} {...section} />
            case 'textSection':
              return <TextSection key={index} section={section} />
            default:
              return null
          }
        })}
      </div>
      <div className="absolute left-0 w-screen border-t" />
    </div>
  )
}

export default Page
