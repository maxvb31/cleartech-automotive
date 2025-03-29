import './globals.css'
import { Roboto } from 'next/font/google'
// import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'
// Import Roboto with specific weights
const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700', '300'], // Add more weights if necessary
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.variable}>
      {/* <GoogleAnalytics /> */}
      <Analytics />
      <body>{children}</body>
    </html>
  )
}
