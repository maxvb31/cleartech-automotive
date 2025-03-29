'use client'
import type { PortableTextBlock } from 'next-sanity'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { SettingsPayload, MenuItem } from '@/types'
import { resolveHref } from '@/sanity/lib/utils' // Import resolveHref for link resolution
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface FooterProps {
  data: SettingsPayload
}

// UK Local Time component
function UKLocalTime() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    // Function to update the time
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/London',
      }
      const ukTime = new Date().toLocaleTimeString('en-GB', options)
      setTime(ukTime)
    }

    // Update time immediately
    updateTime()

    // Update time every second
    const interval = setInterval(updateTime, 1000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-sm md:text-lg lg:text-4xl text-black text-left font-bold">
      <span className="font-bold">local time:</span> {time} GMT
    </div>
  )
}

export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])
  const email = data?.email || 'your-email@example.com' // Fallback email
  const socialLinks = data?.socialMediaLinks || [] // Fallback to empty array
  const menuItems = data?.menuItems || ([] as MenuItem[]) // Get menu items

  return (
    <>
      <footer className="bottom-0 w-full mt-0 py-6 text-center md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-center container">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <span className="text-md md:text-xl text-black md:mb-1">
              {email}
            </span>
            <div className="flex flex-col md:flex-row md:space-x-4 items-center">
              {/* Render Menu Items */}
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-2 md:mb-0">
                {menuItems.map((menuItem, key) => {
                  const href = menuItem.anchor
                    ? `#${menuItem.anchor}` // If anchor link, set href to the anchor
                    : resolveHref(menuItem?._type, menuItem?.slug) // Otherwise, resolve internal link

                  if (!href) return null

                  return (
                    <Link
                      key={key}
                      className="text-md md:text-xl text-black"
                      href={href}
                    >
                      {menuItem.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="text-md md:text-xl text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        {/* New row for footer text and UK Local Time */}
        <div className="container">
          <div className="mt-8 flex items-center justify-between w-full">
            <div className="text-sm md:text-lg lg:text-xl text-black text-left">
              <CustomPortableText
                paragraphClasses="text-sm md:text-lg lg:text-4xl font-bold text-black text-left"
                value={footer}
              />
            </div>
            <UKLocalTime />
          </div>
        </div>
      </footer>
    </>
  )
}
