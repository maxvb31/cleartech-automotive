'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Move cursor
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', moveCursor)

    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  useEffect(() => {
    const hoverTargets = document.querySelectorAll('.hover-target')

    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.2 })
      })

      target.addEventListener('mouseleave', () => {
        gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.2 })
      })
    })

    return () => {
      hoverTargets.forEach((target) => {
        target.removeEventListener('mouseenter', () => {})
        target.removeEventListener('mouseleave', () => {})
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 flex items-center justify-center w-24 h-24 bg-[#F6F1ED] text-black text-sm uppercase font-semibold rounded-full pointer-events-none z-50 opacity-0 scale-0"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      View
    </div>
  )
}
