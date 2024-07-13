import { Helmet } from "react-helmet"
import { Hero } from "../../components/Hero.tsx"
import { Features } from "./Features.tsx"
import { References } from "../references/References.tsx"

export function Home() {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "WebDev Co.",
    url: "https://www.christophel.io",
    description:
      "Expert web development and consulting services, specializing in React, TypeScript, and modern web technologies.",
  }
  return (
    <>
      <Helmet>
        <title>WebDev Co. - Expert Web Development and Consulting Services</title>
        <meta
          name="description"
          content="Christophel.io. offers expert web development and consulting services, specializing in React, TypeScript, and modern web technologies."
        />
        <link rel="canonical" href="https://www.christophel.io" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <div className="home">
        <Hero
          ctaText={"Get Started"}
          subtitle={"Transforming Ideas into Powerful Web Solutions"}
          title={"Web Development Excellence"}
        />
        <Features />
        <References />
      </div>
    </>
  )
}
