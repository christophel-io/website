import { Helmet } from "react-helmet"
import { Teaser } from "./Teaser.tsx"
import { Hero } from "./Hero.tsx"

const helmetData = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  name: "christophel.io",
  url: "https://www.christophel.io",
  description:
    "Expert web development and consulting services, specializing in React, TypeScript, and modern web technologies.",
}
export function Home() {
  return (
    <>
      <Helmet>
        <title>christophel.io - Expert Web Development and Consulting Services</title>
        <meta
          name="description"
          content="Christophel.io. offers expert web development and consulting services, specializing in React, TypeScript, NestJS and modern web technologies."
        />
        <link rel="canonical" href="https://www.christophel.io" />
        <script type="application/ld+json">{JSON.stringify(helmetData)}</script>
      </Helmet>
      <div className="home">
        <Hero />
        <Teaser />
      </div>
    </>
  )
}
