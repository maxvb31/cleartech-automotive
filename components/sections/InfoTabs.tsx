'use client'

import { useRef, useState } from 'react'
import Button from '../Button'
import { InfoTabsSection, LargeProductShowcaseSection } from '@/types'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/urlForImage'

interface InfoTabsProps extends InfoTabsSection {}

export function InfoTabs({
  title,
  tabs,
  backgroundImage,
  buttons,
}: InfoTabsProps) {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const buttonsRef = useRef<HTMLDivElement | null>(null)
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const backgroundImageUrl = backgroundImage
    ? urlForImage(backgroundImage).url()
    : ''

  return (
    <section
      id="info-tabs-section"
      className="bg-[#171717] relative min-h-screen flex flex-col justify-between"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col h-full">
        {/* Title */}
        <div className="text-center mb-auto">
          <h2 className="text-5xl md:text-5xl text-white tracking-wider font-michroma uppercase">
            {title}
          </h2>
        </div>

        <div className="mt-auto">
          {/* Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`cursor-pointer p-6 transition-all duration-300 ${
                  activeTabIndex === index
                    ? 'opacity-100'
                    : 'opacity-50 hover:opacity-75'
                }`}
                onClick={() => setActiveTabIndex(index)}
              >
                <hr className="border-t-2 border-white opacity-70 mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase">
                  {tab.title}
                </h3>
                {tab.overview && (
                  <div
                    className={`text-white transition-opacity duration-300 ${
                      activeTabIndex === index ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <PortableText value={tab.overview} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex justify-center mt-8">
              {buttons.map((button, i) => (
                <Button
                  key={i}
                  label={button.label}
                  link={button.link}
                  externalLink={button.externalLink}
                  anchor={button.anchor}
                  buttonColor={button.buttonColor}
                  className="mx-2"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default InfoTabs
