import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface Point {
  x: number
  y: number
}

interface Path {
  start: THREE.Vector3
  end: THREE.Vector3
  active: boolean
  line: THREE.Line
}

interface Neuron {
  pathIndex: number
  progress: number
  speed: number
  mesh: THREE.Mesh
}

export function Heart() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current!.clientWidth,
          height: containerRef.current!.clientHeight,
        })
      }
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const aspectRatio = dimensions.width / dimensions.height
    const frustumSize = 10
    const padding = 0.1
    const camera = new THREE.OrthographicCamera(
      ((frustumSize * aspectRatio) / -2) * (1 + padding),
      ((frustumSize * aspectRatio) / 2) * (1 + padding),
      (frustumSize / 2) * (1 + padding),
      (frustumSize / -2) * (1 + padding),
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(dimensions.width, dimensions.height)
    container.appendChild(renderer.domElement)

    camera.position.z = 10

    const heartShape = (t: number): Point => {
      const x = 16 * Math.pow(Math.sin(t), 3)
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
      return { x, y }
    }

    const heartScale = 0.3 * (aspectRatio > 1 ? 1 / aspectRatio : 1) * (1 - padding)
    const numPaths = 10
    const paths: Path[] = []
    const neurons: Neuron[] = []

    const heartPoints: THREE.Vector3[] = []
    for (let t = 0; t < Math.PI * 2; t += 0.01) {
      const point = heartShape(t)
      heartPoints.push(new THREE.Vector3(point.x * heartScale, point.y * heartScale, 0))
    }

    const heartGeometry = new THREE.BufferGeometry().setFromPoints(heartPoints)
    const heartMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 })
    const heartLine = new THREE.Line(heartGeometry, heartMaterial)
    scene.add(heartLine)

    const generatePath = (): Path => {
      const start = heartPoints[Math.floor(Math.random() * heartPoints.length)]
      const end = heartPoints[Math.floor(Math.random() * heartPoints.length)]
      const pathGeometry = new THREE.BufferGeometry().setFromPoints([start, end])
      const pathMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6, opacity: 0.25, transparent: true })
      const line = new THREE.Line(pathGeometry, pathMaterial)
      scene.add(line)
      return {
        start,
        end,
        active: true,
        line,
      }
    }

    for (let i = 0; i < numPaths; i++) {
      paths.push(generatePath())
    }

    const addNeuron = () => {
      const availablePaths = paths.filter((p) => p.active && !neurons.some((n) => n.pathIndex === paths.indexOf(p)))
      if (availablePaths.length > 0) {
        const pathIndex = paths.indexOf(availablePaths[Math.floor(Math.random() * availablePaths.length)])
        const neuronGeometry = new THREE.SphereGeometry(0.05, 32, 32)
        const neuronMaterial = new THREE.MeshBasicMaterial({ color: 0x3b82f6 })
        const neuronMesh = new THREE.Mesh(neuronGeometry, neuronMaterial)
        scene.add(neuronMesh)
        neurons.push({
          pathIndex,
          progress: 0,
          speed: 0.005 + Math.random() * 0.005,
          mesh: neuronMesh,
        })
      }
    }

    const animate = () => {
      paths.forEach((path, pathIndex) => {
        if (path.active) {
          const neuron = neurons.find((n) => n.pathIndex === pathIndex)
          if (neuron) {
            const x = path.start.x + (path.end.x - path.start.x) * neuron.progress
            const y = path.start.y + (path.end.y - path.start.y) * neuron.progress
            neuron.mesh.position.set(x, y, 0)

            neuron.progress += neuron.speed
            if (neuron.progress > 1) {
              path.active = false
              scene.remove(path.line)
              scene.remove(neuron.mesh)
              neurons.splice(neurons.indexOf(neuron), 1)
              paths[pathIndex] = generatePath()
            }
          }
        }
      })

      if (neurons.length < numPaths / 2) addNeuron()

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      const newAspectRatio = newWidth / newHeight

      camera.left = ((-frustumSize * newAspectRatio) / 2) * (1 + padding)
      camera.right = ((frustumSize * newAspectRatio) / 2) * (1 + padding)
      camera.top = (frustumSize / 2) * (1 + padding)
      camera.bottom = (-frustumSize / 2) * (1 + padding)
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [dimensions])

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
}
