import { map } from "ramda"
import { Reference } from "./Reference.tsx"

const references: Reference[] = [
  {
    clientName: "Tech Innovators Inc.",
    industry: "Fintech",
    projectDescription: "Entwicklung einer skalierbaren Microservices-Architektur für eine Echtzeit-Handelsplattform.",
    technologiesUsed: ["React", "TypeScript", "Node.js", "Docker", "Kubernetes"],
    outcome: "50% Verbesserung der Systemleistung und erfolgreiche Skalierung auf 1 Million aktive Benutzer.",
  },
  {
    clientName: "Global Solutions Ltd.",
    industry: "Logistik",
    projectDescription:
      "Implementierung eines unternehmensweiten ERP-Systems mit kundenspezifischen Modulen für Lieferkettenverwaltung.",
    technologiesUsed: ["Angular", "Java Spring Boot", "PostgreSQL", "Redis"],
    outcome: "30% Reduktion der Betriebskosten und Verbesserung der Liefergenauigkeit um 25%.",
  },
  {
    clientName: "Creative Minds Agency",
    industry: "Marketing",
    projectDescription: "Entwicklung einer KI-gestützten Analyseplattform für Marketingkampagnen in sozialen Medien.",
    technologiesUsed: ["Python", "TensorFlow", "React", "AWS"],
    outcome: "Steigerung des ROI von Marketingkampagnen um durchschnittlich 40%.",
  },
]

export function References() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Unsere Referenzen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{map(Reference, references)}</div>
      </div>
    </section>
  )
}
