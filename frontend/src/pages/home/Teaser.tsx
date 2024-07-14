import { Heart } from "./Heart.tsx"

export function Teaser() {
  return (
    <section
      id="more"
      className="relative bg-gradient-to-b from-gray-900 to-blue-900 min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden opacity-90"
    >
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen">
        <Heart />
      </div>
      <div className="w-full md:w-1/2 px-8 md:px-16 text-white py-8 md:py-0">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left">
          Made with <span className="text-blue-500">passion</span>.
        </h1>
        <p className="text-base md:text-lg mb-8 text-center md:text-left">
          This site is currently under construction. Please come back at a later stage
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            className="bg-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-blue-600 transition-colors duration-300 text-base md:text-lg font-semibold text-center"
            href="/contact#top"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}
