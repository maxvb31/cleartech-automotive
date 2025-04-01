'use client'

import { useRef, useState } from 'react'
import Button from '../Button'
import { HeroSection } from '@/types'
import { PortableText } from '@portabletext/react'

interface HeroProps extends HeroSection {}

export function Hero({ title, video, buttons, overview }: HeroProps) {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const buttonsRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)

  // Helper function to get video URL
  const getVideoUrl = (video: any) => {
    if (!video || !video.asset) return ''
    if (video.asset.url) return video.asset.url
    if (video.asset._ref) {
      const fileId = video.asset._ref.replace('file-', '').split('-')[0]
      const extension = video.asset._ref.split('-').pop()
      return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileId}.${extension}`
    }
    return ''
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section
      id="hero-section"
      ref={heroRef}
      className="relative w-full h-[900px] bg-black text-white overflow-hidden"
    >
      {/* Video Background with Overlay */}
      {video && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <video
            ref={videoRef}
            src={getVideoUrl(video)}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
          />
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 z-20"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Content Container */}
      <div className="container relative z-20 h-full flex flex-col justify-end pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          {/* Left Side: Title and Overview */}
          <div className="flex flex-col">
            <h1
              ref={titleRef}
              className="font-michroma text-5xl md:text-3xl lg:text-4xl mb-6"
            >
              {title}
            </h1>

            {overview && (
              <div className="font-helvetica text-lg md:text-xl max-w-xl opacity-90">
                <PortableText value={overview} />
              </div>
            )}
          </div>

          {/* Right Side: Buttons */}
          <div
            ref={buttonsRef}
            className="flex items-center justify-start md:justify-end gap-4 md:gap-6"
          >
            {buttons?.map((button) => (
              <Button
                key={button.label}
                label={button.label}
                link={button.link}
                anchor={button.anchor}
                externalLink={button.externalLink}
                buttonColor={button.buttonColor}
                className="font-michroma text-base md:text-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
