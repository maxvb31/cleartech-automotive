import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string // slug might still be undefined, so you'll need to handle that in your code
  title?: string
  anchor?: string // Add the anchor property here
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
  videoLink?: string
  siteLink?: string
  backgroundPattern?: string
  sections?: Array<any>
  category?: {
    _type: string
    name: string
  }
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  // ... other image properties
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
  sections?: Array<HeroSection>
}
export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
  sections?: Array<HeroSection>
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  siteLink?: string
  videoLink?: string
  slug: string
  tags?: string[]
  title?: string
  sections?: Array<HeroSection>
  category?: {
    _type: 'reference'
    _ref: string
  }
}

export interface ServicePayload {
  title: string
  slug: string
  coverImage?: Image
  button?: {
    label: string
    link?: { slug: string; title: string }
    buttonColor?: { label: string; value: string }
  }
  overview?: PortableTextBlock[]
  number?: string
  subServices?: SubServicePayload[]
}

export interface SubServicePayload {
  _type: string
  title: string
  icon?: Image
  overview?: PortableTextBlock[]
  number?: string
}

export interface SettingsPayload {
  siteTitle?: string
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
  email?: string
  socialMediaLinks?: {
    name: string
    url: string
  }[]
}

//Section Payloads

export interface HeroSection {
  _type: 'hero'
  title: string
  video?: SanityFile
  overview?: PortableTextBlock[]
  buttons?: {
    label: string
    link?: { slug: string; title: string }
    anchor?: string
    externalLink?: string
    buttonColor?: { label: string; value: string }
  }[]
}

export interface LargeProductShowcaseSection {
  _type: 'largeProductShowcase'
  tagline: string
  title: string
  product: SanityImage
  buttons?: {
    label: string
    link?: { slug: string; title: string }
    anchor?: string
    externalLink?: string
  }[]
}
