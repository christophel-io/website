import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface Neuron {
  x: number
  y: number
  radius: number
  color: string
  glowIntensity: number
  pulseRadius: number
  pulseOpacity: number
}

interface Connection {
  from: Neuron
  to: Neuron
  progress: number
  speed: number
  color: string
  controlPoints: Point[]
  active: boolean
}

interface Point {
  x: number
  y: number
}

const MOBILE_WIDTH: number = 1024

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current!.getBoundingClientRect()
        const aspectRatio = 16 / 9
        let newWidth = width
        let newHeight = height
        const newIsMobile = width < MOBILE_WIDTH

        if (newIsMobile) {
          newHeight = Math.min(height, width / aspectRatio) * 2
          newWidth = newHeight * aspectRatio
        }

        setDimensions({ width: newWidth, height: newHeight })
        setIsMobile(newIsMobile)
      }
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const isMobile = window.innerWidth < MOBILE_WIDTH
    const scaleFactor = Math.min(dimensions.width / 1920, dimensions.height / 1080)

    canvas.width = isMobile ? dimensions.width * 2 : dimensions.width
    canvas.height = isMobile ? dimensions.height * 2 : dimensions.height

    const layers = [
      { nodes: 3, color: "#3B82F6", glow: 0 },
      { nodes: 6, color: "#3B82F6", glow: 0.2 },
      { nodes: 4, color: "#3B82F6", glow: 0.5 },
      { nodes: 6, color: "#3B82F6", glow: 0.8 },
      { nodes: 3, color: "#8B5CF6", glow: 1 },
    ]

    const neurons: Neuron[] = []
    layers.forEach((layer, layerIndex) => {
      const layerWidth = canvas.width / (layers.length + 1)
      const x = layerWidth * (layerIndex + 1)
      for (let i = 0; i < layer.nodes; i++) {
        const y = (canvas.height / (layer.nodes + 1)) * (i + 1)
        neurons.push({
          x,
          y,
          radius: 6 * scaleFactor,
          color: layer.color,
          glowIntensity: layer.glow,
          pulseRadius: 0,
          pulseOpacity: 0,
        })
      }
    })

    const generateControlPoints = (startX: number, startY: number, endX: number, endY: number, count: number) => {
      const points = []
      for (let i = 0; i < count; i++) {
        const t = (i + 1) / (count + 1)
        const x = startX + (endX - startX) * t + (Math.random() - 0.5) * 100 * scaleFactor
        const y = startY + (endY - startY) * t + (Math.random() - 0.5) * 100 * scaleFactor
        points.push({ x, y })
      }
      return points
    }

    const connections: Connection[] = []
    for (let i = 0; i < layers.length - 1; i++) {
      const fromLayer = neurons.slice(
        layers.slice(0, i).reduce((sum, layer) => sum + layer.nodes, 0),
        layers.slice(0, i + 1).reduce((sum, layer) => sum + layer.nodes, 0),
      )
      const toLayer = neurons.slice(
        layers.slice(0, i + 1).reduce((sum, layer) => sum + layer.nodes, 0),
        layers.slice(0, i + 2).reduce((sum, layer) => sum + layer.nodes, 0),
      )

      fromLayer.forEach((from) => {
        toLayer.forEach((to) => {
          connections.push({
            from,
            to,
            progress: 0,
            speed: 0.002 + Math.random() * 0.003,
            color: Math.random() > 0.8 ? "#D946EF" : "#3B82F6",
            controlPoints: generateControlPoints(from.x, from.y, to.x, to.y, 3),
            active: false,
          })
        })
      })
    }

    const getPointOnPath = (points: Point[], progress: number): Point => {
      const totalLength = points.reduce((acc, point, index, arr) => {
        if (index === 0) return 0
        return acc + Math.hypot(point.x - arr[index - 1].x, point.y - arr[index - 1].y)
      }, 0)

      let distanceTraveled = totalLength * progress
      for (let i = 1; i < points.length; i++) {
        const segmentLength = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
        if (distanceTraveled <= segmentLength) {
          const segmentProgress = distanceTraveled / segmentLength
          return {
            x: points[i - 1].x + (points[i].x - points[i - 1].x) * segmentProgress,
            y: points[i - 1].y + (points[i].y - points[i - 1].y) * segmentProgress,
          }
        }
        distanceTraveled -= segmentLength
      }
      return points[points.length - 1]
    }

    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      connections.forEach((connection) => {
        if (!connection.active && Math.random() < 0.01) {
          connection.active = true
          connection.progress = 0
        }

        if (connection.active) {
          const pathPoints = [connection.from, ...connection.controlPoints, connection.to]

          ctx.beginPath()
          ctx.moveTo(connection.from.x, connection.from.y)
          connection.controlPoints.forEach((point) => {
            ctx.lineTo(point.x, point.y)
          })
          ctx.lineTo(connection.to.x, connection.to.y)

          ctx.strokeStyle = connection.color
          ctx.lineWidth = isMobile ? 2 : 1.5 * scaleFactor
          ctx.globalAlpha = 0.5
          ctx.stroke()
          ctx.globalAlpha = 1

          const point = getPointOnPath(pathPoints, connection.progress)

          ctx.beginPath()
          ctx.arc(point.x, point.y, isMobile ? 3 : 2.5 * scaleFactor, 0, Math.PI * 2)
          ctx.fillStyle = connection.color
          ctx.fill()

          connection.progress += connection.speed
          if (connection.progress >= 1) {
            connection.active = false
            connection.to.pulseRadius = 20 * scaleFactor
            connection.to.pulseOpacity = 0.5
          }
        }
      })

      neurons.forEach((neuron) => {
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2)
        ctx.fillStyle = neuron.color
        ctx.fill()

        if (neuron.glowIntensity > 0) {
          const gradient = ctx.createRadialGradient(
            neuron.x,
            neuron.y,
            neuron.radius,
            neuron.x,
            neuron.y,
            neuron.radius * 3,
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${neuron.glowIntensity * 0.5})`)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
          ctx.fillStyle = gradient
          ctx.fill()
        }

        if (neuron.pulseRadius > 0) {
          ctx.beginPath()
          ctx.arc(neuron.x, neuron.y, neuron.pulseRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(100, 100, 100, ${neuron.pulseOpacity})`
          ctx.fill()
          neuron.pulseRadius += scaleFactor
          neuron.pulseOpacity -= 0.025
          if (neuron.pulseOpacity <= 0) {
            neuron.pulseRadius = 0
            neuron.pulseOpacity = 0
          }
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-gray-900 opacity-90"></div>
        <div
          className="w-full h-full md:w-auto md:h-auto"
          style={{
            width: isMobile ? dimensions.width * 2 : dimensions.width,
            height: isMobile ? dimensions.height * 2 : dimensions.height,
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute h-full opacity-50"
            style={{ right: isMobile ? "-100%" : "initial", top: 0 }}
          />
        </div>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
        >
          Accelerate Innovation with AI.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto"
        >
          Deliver fast, clean, and fully customized application and business solutions with our AI-driven development
          process.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6"
        >
          <Link
            to="/contact"
            className="bg-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-blue-600 transition-colors duration-300 text-base md:text-lg font-semibold"
          >
            Contact us
          </Link>
          <a
            href="#more"
            className="bg-transparent border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-white hover:text-blue-900 transition-colors duration-300 text-base md:text-lg font-semibold"
          >
            More
          </a>
        </motion.div>
      </div>
    </section>
  )
}
