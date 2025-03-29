'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  // Fade animation variant with only the fade-in effect
  const fadeVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  }

  return (
    <motion.div
      className="page-transition-container"
      key={pathname}
      initial={fadeVariant.initial}
      animate={fadeVariant.animate}
      transition={fadeVariant.transition}
    >
      {children}
    </motion.div>
  )
}
