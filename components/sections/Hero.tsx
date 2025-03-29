'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { urlForImage } from '@/sanity/lib/urlForImage'
import Button from '../Button'
import { HeroSection } from '@/types'

interface HeroProps extends HeroSection {}

export function Hero({ title, video, buttons }: HeroProps) {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const buttonsRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    if (titleRef.current) {
      const animation = gsap.fromTo(
        titleRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: {
            amount: 0.3,
            from: 'start',
            ease: 'Power1.easeInOut',
          },
        },
      )

      // Cleanup animation
      return () => {
        animation.kill()
      }
    }
  }, [title])

  useEffect(() => {
    if (buttonsRef.current) {
      const animation = gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'Power3.easeInOut',
        },
      )

      // Cleanup animation
      return () => {
        animation.kill()
      }
    }
  }, [buttons])

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
      className="relative flex flex-col items-center w-full bg-[#F6F1ED]"
    >
      <div className="container flex flex-col items-center justify-center py-8">
        <div className="w-full relative overflow-hidden mb-8">
          <h1
            ref={titleRef}
            className="hero-title font-bold text-center w-full text-4xl md:text-6xl lg:text-7xl"
          >
            {title.split('').map((letter, index) => (
              <span key={index} className="letter inline-block">
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>
        </div>

        <div
          ref={buttonsRef}
          className="hero-buttons flex items-center justify-between w-full mb-14 px-4"
        >
          {buttons?.map((button) => (
            <Button
              key={button.label}
              label={button.label}
              link={button.link}
              anchor={button.anchor}
              externalLink={button.externalLink}
              buttonColor={button.buttonColor}
              className="font-bold text-xl"
            />
          ))}
        </div>

        {video && (
          <div className="w-full relative aspect-video">
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
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
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
      </div>
    </section>
  )
}

export default Hero
