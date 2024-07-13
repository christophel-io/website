import React from "react"
import { Helmet } from "react-helmet"
import { Service } from "./Service.tsx"

const services: Service[] = [
  {
    title: "Web Application Development",
    description:
      "Custom web applications tailored to your business needs using React, TypeScript, and modern web technologies.",
    icon: "/icons/web-dev.svg",
  },
  {
    title: "Software Consulting",
    description:
      "Expert advice on software architecture, technology stack selection, and best practices for your projects.",
    icon: "/icons/consulting.svg",
  },
  {
    title: "UI/UX Design",
    description: "User-centric design solutions that enhance user experience and drive engagement.",
    icon: "/icons/design.svg",
  },
  {
    title: "API Development & Integration",
    description:
      "Robust API development and seamless integration with third-party services to extend your application's capabilities.",
    icon: "/icons/api.svg",
  },
  {
    title: "Performance Optimization",
    description: "Improve your web application's speed and efficiency for better user experience and SEO.",
    icon: "/icons/performance.svg",
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing maintenance and support to ensure your web applications remain secure, up-to-date, and performant.",
    icon: "/icons/support.svg",
  },
]

export function Services() {
  return (
    <>
      <Helmet>
        <title>Our Services - WebDev Co.</title>
        <meta
          name="description"
          content="Explore our comprehensive web development and consulting services, including custom web applications, software consulting, and UI/UX design."
        />
      </Helmet>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Service key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
