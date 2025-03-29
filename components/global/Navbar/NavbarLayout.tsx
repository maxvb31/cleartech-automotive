'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar({ data }: NavbarProps) {
  const menuItems = data?.menuItems || ([] as MenuItem[])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="top-0 z-10 backdrop-blur">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-wrap items-center gap-x-5 py-4 md:px-16 md:py-5 ">
        {menuItems.map((menuItem, key) => {
          const href = menuItem.anchor
            ? `#${menuItem.anchor}` // If anchor link, set href to the anchor
            : resolveHref(menuItem?._type, menuItem?.slug) // Otherwise, resolve internal link

          if (!href) return null

          return (
            <Link
              key={key}
              className={`text-lg hover:text-black md:text-xl ${
                menuItem?._type === 'home'
                  ? 'font-extrabold text-black'
                  : 'text-black'
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            type="button"
            className="text-black hover:text-black"
            aria-label="Open Mobile Menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            {/* Inline SVG for Bars (Menu) Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-12 w-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setMobileMenuOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 flex items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-full opacity-0"
              >
                <Dialog.Panel className="relative bg-[#000000] w-full h-full p-6 transform transition-all">
                  <button
                    type="button"
                    className="absolute left-4 top-4 hover:text-black"
                    aria-label="Close Mobile Menu"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {/* Inline SVG for X (Close) Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      className="h-12 w-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-col items-center justify-center h-full space-y-6">
                    {/* Mobile Menu Items */}
                    {menuItems.map((menuItem, key) => {
                      const href = menuItem.anchor
                        ? `#${menuItem.anchor}` // If anchor link, set href to the anchor
                        : resolveHref(menuItem?._type, menuItem?.slug) // Otherwise, resolve internal link

                      if (!href) return null

                      return (
                        <Transition.Child
                          as={Fragment}
                          key={key}
                          enter="transition ease-in-out duration-500 delay-200 transform"
                          enterFrom="-translate-x-8 opacity-0"
                          enterTo="translate-x-0 opacity-100"
                          leave="transition ease-in-out duration-500 transform"
                          leaveFrom="translate-x-0 opacity-100"
                          leaveTo="-translate-x-8 opacity-0"
                        >
                          <Link
                            className="text-2xl font-semibold text-white"
                            href={href}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {menuItem.title}
                          </Link>
                        </Transition.Child>
                      )
                    })}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </nav>
    </header>
  )
}
