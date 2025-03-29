'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import ImageBox from '@/components/shared/ImageBox'
import type { ProjectPayload } from '@/types'
import SingleImage from '@/components/shared/SingleImage'
import DoubleImages from '@/components/shared/DoubleImages'
import Button from '@/components/Button'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

export interface ProjectPageProps {
  data: ProjectPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function ProjectPage({ data, encodeDataAttribute }: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, overview, coverImage, siteLink, videoLink, tags, sections } =
    data ?? {}

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.3, // Adjust duration for smoother scroll
      easing: (t) => 1 - Math.pow(1 - t, 2.5), // Adjust easing for natural scrolling
      smooth: true,
      smoothTouch: false, // Optional: Disable touch smoothing for better performance
    })

    // Request animation frame to ensure smoothness
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy() // Cleanup Lenis on unmount
  }, [])

  useEffect(() => {
    // Scroll to the top when `data` or `sections` change
    window.scrollTo(0, 0)
  }, [data, sections])

  // Function to render different section types
  const renderSection = (section: any, index: number) => {
    switch (section._type) {
      case 'singleImage':
        return <SingleImage key={index} image={section.image} />
      case 'doubleImages':
        return (
          <DoubleImages
            key={index}
            image1={section.image1}
            image2={section.image2}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <section className="bg-[#F6F1ED]">
        <div className="container">
          <div className="top flex flex-col gap-4 items-center justify-center py-12">
            {title && (
              <h1 className="text-[40px] lg:text-[80px] font-bold leading-[1.2]">
                {title}
              </h1>
            )}
            <div className="text-sm lg:text-xl font-thin max-w-[80ch]">
              {overview && <CustomPortableText value={overview} />}
            </div>

            {/* Render buttons based on available links */}
            <div className="mt-4 flex gap-4">
              {videoLink && (
                <Button
                  label="View Video"
                  externalLink={videoLink}
                  buttonColor={{ label: 'Black', value: '#000000' }}
                  className="text-lg md:text-sm bg-black text-white px-4 py-2 rounded-full"
                  icon={
                    <img
                      src="/svg/diagonal-arrow.svg"
                      alt="Diagonal arrow pointing right"
                      className="ml-2"
                      style={{
                        width: '12px',
                        height: '12px',
                        filter: 'invert(1)',
                      }}
                    />
                  }
                />
              )}
              {siteLink && (
                <Button
                  label="View Website"
                  externalLink={siteLink}
                  buttonColor={{ label: 'Black', value: '#000000' }}
                  className="text-lg md:text-sm bg-black text-white px-4 py-2 rounded-full"
                  icon={
                    <img
                      src="/svg/diagonal-arrow.svg"
                      alt="Diagonal arrow pointing right"
                      className="ml-2"
                      style={{
                        width: '12px',
                        height: '12px',
                        filter: 'invert(1)',
                      }}
                    />
                  }
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Render sections */}
      {sections && sections.length > 0 && (
        <section className="bg-[#F6F1ED]">
          <div className="container">
            {sections.map((section, index) => renderSection(section, index))}
          </div>
        </section>
      )}
    </>
  )
}

export default ProjectPage
