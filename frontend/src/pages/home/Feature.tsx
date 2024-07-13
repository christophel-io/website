export interface FeatureProps {
  icon: string
  title: string
  description: string
}

export function Feature({ icon, title, description }: FeatureProps) {
  return (
    <article className="feature p-6 bg-white rounded-lg shadow-md">
      <img src={icon} alt="" className="w-16 h-16 mb-4 mx-auto" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </article>
  )
}
