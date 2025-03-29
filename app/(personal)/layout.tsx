import '@/styles/index.css'
import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { toPlainText } from 'next-sanity'
import { Suspense } from 'react'
import Head from 'next/head'
import { Footer } from '@/components/global/Footer'
import { Navbar } from '@/components/global/Navbar'
import { PageTransition } from '@/components/global/PageTransition'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery'
import FaviconHead from '@/components/global/FaviconHead'

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing'),
)

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    loadSettings(),
    loadHomePage(),
  ])

  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  const siteTitle = settings?.siteTitle || 'Personal website'

  return {
    title: {
      template: `%s | ${siteTitle}`,
      default: siteTitle,
    },
    description: homePage?.overview
      ? toPlainText(homePage.overview)
      : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    icons: {
      icon: '/favicon.ico', // Path to your favicon
      apple: '/apple-touch-icon.png', // Path to your apple-touch-icon
      shortcut: '/favicon.ico', // Path to the shortcut icon
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <FaviconHead />

      {/* Add Head to include favicon */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>

      <div className="flex min-h-screen flex-col text-black">
        <Suspense>
          <Navbar />
        </Suspense>
        <Suspense>
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </div>

      {draftMode().isEnabled && <LiveVisualEditing />}
    </>
  )
}
