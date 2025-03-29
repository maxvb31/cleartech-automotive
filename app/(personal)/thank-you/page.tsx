import Link from 'next/link'

export default function ThankYou() {
  return (
    <main className="flex flex-col h-[800px] items-center justify-center p-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          Thank you for your message
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          I will respond as soon as possible
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white py-4 px-8 rounded-[35px] font-medium hover:bg-black/90 transition-colors text-lg"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
