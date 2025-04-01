'use client'

import { useRef, useState, Fragment } from 'react'
import { ContactSection as ContactSectionType } from '@/types'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/urlForImage'
import { Dialog, Transition } from '@headlessui/react'

interface ContactSectionProps extends ContactSectionType {}

export function Contact({
  title,
  overview,
  backgroundImage,
}: ContactSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const contactFormRef = useRef<HTMLFormElement>(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission, like sending data to an API
    // For now, we'll just close the modal and could redirect to a thank you page
    closeModal()
    // Optional: redirect to thank you page
    // window.location.href = '/thank-you'
  }

  return (
    <section
      id="contact-section"
      className="relative bg-[#171717] h-[600px] md:h-[800px] lg:h-[1000px]"
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src={urlForImage(backgroundImage).url()}
            alt={backgroundImage.alt || 'Contact background'}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container relative z-20 flex flex-col items-center text-center justify-start">
        {/* Title */}
        <h2 className="font-michroma text-3xl md:text-5xl uppercase text-white mb-6">
          {title}
        </h2>

        {/* Overview */}
        {overview && (
          <div className="font-helvetica text-lg max-w-2xl mx-auto text-white/90 mb-10">
            <PortableText value={overview} />
          </div>
        )}

        {/* Contact Button */}
        <button
          onClick={openModal}
          className="btn-primary bg-white text-black font-michroma text-base md:text-lg uppercase"
        >
          Contact Us
        </button>
      </div>

      {/* Contact Modal */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeModal}
          initialFocus={contactFormRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#171717] text-white px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      type="button"
                      className="rounded-md text-white/80 hover:text-white focus:outline-none"
                      onClick={closeModal}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="font-michroma text-xl uppercase leading-6 text-white mb-4"
                      >
                        Contact Us
                      </Dialog.Title>

                      <form
                        ref={contactFormRef}
                        onSubmit={handleSubmit}
                        className="mt-2"
                      >
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-white mb-1"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="block w-full rounded-md border-0 bg-white/10 p-2 text-white shadow-sm ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white mb-1"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="block w-full rounded-md border-0 bg-white/10 p-2 text-white shadow-sm ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-white mb-1"
                          >
                            Message
                          </label>
                          <textarea
                            name="message"
                            id="message"
                            rows={4}
                            required
                            className="block w-full rounded-md border-0 bg-white/10 p-2 text-white shadow-sm ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm"
                          ></textarea>
                        </div>

                        <div className="mt-5 sm:mt-4">
                          <button
                            type="submit"
                            className="font-michroma inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black uppercase shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
                          >
                            Send Message
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  )
}

export default Contact
