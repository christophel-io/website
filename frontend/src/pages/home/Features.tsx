import { Feature, FeatureProps } from "./Feature.tsx"
import { map } from "ramda"

export function Features() {
  const features: FeatureProps[] = [
    {
      icon: "/icons/responsive.svg",
      title: "Responsive Design",
      description: "Create web applications that look great on any device.",
    },
    {
      icon: "/icons/performance.svg",
      title: "High Performance",
      description: "Optimize your web apps for speed and efficiency.",
    },
    {
      icon: "/icons/security.svg",
      title: "Robust Security",
      description: "Implement industry-leading security practices.",
    },
  ]

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{map(Feature, features)}</div>
      </div>
    </section>
  )
}
