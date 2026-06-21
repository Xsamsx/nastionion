import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ContactThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance" 
    })
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.set(5, 10, 5)
    scene.add(directionalLight)

    // Materials for contact section
    const matNude = new THREE.MeshStandardMaterial({
      color: 0xE8D9C1,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.4
    })
    
    const matRoseSmoke = new THREE.MeshStandardMaterial({
      color: 0xD8A7B1,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    })

    const objects: any[] = []

    // 1. Floating nude torus (left)
    const geoT1 = new THREE.TorusGeometry(1.5, 0.4, 12, 48)
    const meshT1 = new THREE.Mesh(geoT1, matNude)
    meshT1.position.set(-8, 2, -10)
    scene.add(meshT1)
    objects.push({ mesh: meshT1, rx: 0.005, ry: 0.008, bx: -8, by: 2, offset: 0 })

    // 2. Rose Smoke wireframe knot (right)
    const geoK1 = new THREE.TorusKnotGeometry(2, 0.5, 40, 8, 3, 4)
    const meshK1 = new THREE.Mesh(geoK1, matRoseSmoke)
    meshK1.position.set(9, -1, -12)
    scene.add(meshK1)
    objects.push({ mesh: meshK1, rx: 0.003, ry: 0.004, bx: 9, by: -1, offset: Math.PI })

    // 3. Small nude icosahedron (top right)
    const geoI1 = new THREE.IcosahedronGeometry(1.2, 0)
    const meshI1 = new THREE.Mesh(geoI1, matNude)
    meshI1.position.set(7, 4, -8)
    scene.add(meshI1)
    objects.push({ mesh: meshI1, rx: 0.008, ry: 0.006, bx: 7, by: 4, offset: 2 })

    camera.position.z = 5

    const clock = new THREE.Clock()
    let animationId: number

    // Intersection Observer to run only when visible
    let isActive = false
    const observer = new IntersectionObserver((entries) => {
      isActive = entries[0].isIntersecting
    }, { threshold: 0.1 })
    observer.observe(canvas)

    function animate() {
      animationId = requestAnimationFrame(animate)
      if (!isActive) return

      const elapsedTime = clock.getElapsedTime()

      objects.forEach(obj => {
        obj.mesh.rotation.x += obj.rx
        obj.mesh.rotation.y += obj.ry
        const floatY = Math.sin(elapsedTime * 0.4 + obj.offset) * 0.3
        obj.mesh.position.y = obj.by + floatY
      })

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      observer.disconnect()
      scene.clear()
      renderer.dispose()
      geoT1.dispose()
      geoK1.dispose()
      geoI1.dispose()
      matNude.dispose()
      matRoseSmoke.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
}
