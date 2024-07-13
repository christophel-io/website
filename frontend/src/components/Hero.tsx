interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
}

export function Hero({ title, subtitle, ctaText }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl mb-8">{subtitle}</p>
        <a
          href="/contact"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
        >
          {ctaText}
        </a>
      </div>
    </section>
  )
}
