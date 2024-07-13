export interface Service {
  title: string
  description: string
  icon: string
}

export function Service({ title, description, icon }: Service) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img src={icon} alt="" className="w-16 h-16 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
