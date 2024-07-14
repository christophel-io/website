import React, { useEffect, useRef, useState } from "react"

interface Point {
  x: number
  y: number
}

interface Path {
  points: Point[]
  active: boolean
}

interface Neuron {
  pathIndex: number
  progress: number
  speed: number
}

export function Teaser() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    canvas.width = dimensions.width / 2
    canvas.height = dimensions.height

    const heartShape = (t: number, scale: number): Point => {
      const x = 16 * Math.sin(t) ** 3
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
      return {
        x: canvas.width / 2 + x * scale,
        y: canvas.height / 2 + y * scale,
      }
    }

    const heartScale = canvas.height / 40
    const numPaths = 30
    const paths: Path[] = []
    const neurons: Neuron[] = []

    const heartPoints: Point[] = []
    for (let t = 0; t < Math.PI * 2; t += 0.02) {
      heartPoints.push(heartShape(t, heartScale))
    }

    const generatePath = (): Path => {
      const start = heartPoints[Math.floor(Math.random() * heartPoints.length)]
      const end = heartPoints[Math.floor(Math.random() * heartPoints.length)]

      // Use linear interpolation for midpoints
      const midPoint1 = {
        x: start.x + (end.x - start.x) * (1 / 3 + (Math.random() - 0.5) * 0.2),
        y: start.y + (end.y - start.y) * (1 / 3 + (Math.random() - 0.5) * 0.2),
      }

      const midPoint2 = {
        x: start.x + (end.x - start.x) * (2 / 3 + (Math.random() - 0.5) * 0.2),
        y: start.y + (end.y - start.y) * (2 / 3 + (Math.random() - 0.5) * 0.2),
      }

      return {
        points: [start, midPoint1, midPoint2, end],
        active: true,
      }
    }

    for (let i = 0; i < numPaths; i++) {
      paths.push(generatePath())
    }

    const addNeuron = () => {
      const availablePaths = paths.filter((p) => p.active)
      if (availablePaths.length > 0) {
        const pathIndex = paths.indexOf(availablePaths[Math.floor(Math.random() * availablePaths.length)])
        neurons.push({
          pathIndex,
          progress: 0,
          speed: 0.002 + Math.random() * 0.003,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw heart outline with smoother curve
      ctx.beginPath()
      heartPoints.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y)
        else ctx.lineTo(point.x, point.y)
      })
      ctx.closePath()
      ctx.strokeStyle = "rgb(59,130,246)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw and update paths
      paths.forEach((path) => {
        if (path.active) {
          ctx.beginPath()
          ctx.moveTo(path.points[0].x, path.points[0].y)
          ctx.bezierCurveTo(
            path.points[1].x,
            path.points[1].y,
            path.points[2].x,
            path.points[2].y,
            path.points[3].x,
            path.points[3].y,
          )
          ctx.strokeStyle = "rgba(59,130,246,0.25)"
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })

      neurons.forEach((neuron, index) => {
        const path = paths[neuron.pathIndex]
        if (path.active) {
          const t = neuron.progress
          const p0 = path.points[0]
          const p1 = path.points[1]
          const p2 = path.points[2]
          const p3 = path.points[3]
          const x =
            Math.pow(1 - t, 3) * p0.x +
            3 * Math.pow(1 - t, 2) * t * p1.x +
            3 * (1 - t) * Math.pow(t, 2) * p2.x +
            Math.pow(t, 3) * p3.x
          const y =
            Math.pow(1 - t, 3) * p0.y +
            3 * Math.pow(1 - t, 2) * t * p1.y +
            3 * (1 - t) * Math.pow(t, 2) * p2.y +
            Math.pow(t, 3) * p3.y

          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fillStyle = "rgb(59,130,246)"
          ctx.fill()

          neuron.progress += neuron.speed
          if (neuron.progress > 1) {
            path.active = false
            neurons.splice(index, 1)
            paths[neuron.pathIndex] = generatePath()
          }
        } else {
          neurons.splice(index, 1)
        }
      })

      if (Math.random() < 0.05) addNeuron()

      requestAnimationFrame(animate)
    }

    animate()
  }, [dimensions])

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-blue-900 h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden opacity-90">
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="w-full md:w-1/2 px-8 md:px-16 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Made with <span className="text-blue-500">passion</span>.
        </h1>
        <p className="text-lg mb-8">This site is currently under construction. Please come back at a later stage</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            className="bg-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-blue-600 transition-colors duration-300 text-base md:text-lg font-semibold"
            href="/demo"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}
