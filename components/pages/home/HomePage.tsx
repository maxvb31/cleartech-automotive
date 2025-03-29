'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import { Hero } from '@/components/sections/Hero'
import TextSection from '@/components/sections/TextSection'

import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Initialize Lenis on mount
  useEffect(() => {
    // Check if the window size is large or extra-large
    const isLargeScreen = window.innerWidth >= 1024 // Adjust the breakpoint as needed

    let lenis
    if (isLargeScreen) {
      lenis = new Lenis({
        duration: 0.3, // Adjust for smoother/slower scroll
        easing: (t) => 1 - Math.pow(1 - t, 3), // Custom easing function
        // smoothScroll: true, // Removed as it's not a valid property
        // touchScroll: false, // Removed as it's not a valid property
      })

      const raf = (time: number) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      return () => lenis.destroy() // Cleanup on unmount
    }
  }, [])

  // Default to an empty object to allow previews on non-existent documents
  const {
    overview = [],
    showcaseProjects = [],
    title = '',
    sections = [],
  } = data ?? {}

  return (
    <div className="space-y-20">
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

      {/* Showcase projects */}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="mx-auto max-w-[100rem] rounded-md border">
          {showcaseProjects.map((project, key) => {
            const href = resolveHref(project?._type, project?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.([
                  'showcaseProjects',
                  key,
                  'slug',
                ])}
              >
                <ProjectListItem project={project} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HomePage
