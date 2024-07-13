export interface Reference {
  projectDescription: string
  technologiesUsed: string[]
  outcome: string
  clientName: string
  industry: string
}

export function Reference({ projectDescription, technologiesUsed, outcome, clientName, industry }: Reference) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-2">{clientName}</h3>
      <p className="text-sm text-gray-500 mb-4">{industry}</p>
      <p className="text-gray-600 mb-4">{projectDescription}</p>
      <div className="mb-4">
        <strong className="block mb-2">Technologien:</strong>
        <ul className="list-disc list-inside">
          {technologiesUsed.map((tech, index) => (
            <li key={index} className="text-sm">
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-gray-600">
        <strong>Ergebnis:</strong> {outcome}
      </p>
    </div>
  )
}
