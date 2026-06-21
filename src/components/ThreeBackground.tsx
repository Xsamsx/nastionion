import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeBackground({ id }: { id: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance" 
    })
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)

    camera.position.set(-2, 0, 10)

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5)
    scene.add(ambientLight)
    
    const pointLight = new THREE.PointLight(0xffffff, 40, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    const matOrchid = new THREE.MeshStandardMaterial({
      color: 0xE5D1D9,
      emissive: 0xE5D1D9,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.9
    })
    const matRoseSmoke = new THREE.MeshStandardMaterial({
      color: 0xD8A7B1,
      emissive: 0xD8A7B1,
      emissiveIntensity: 0.4,
      roughness: 0.4,
      metalness: 1.0,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    })
    const matNude = new THREE.MeshStandardMaterial({
      color: 0xE8D9C1,
      roughness: 0.1,
      metalness: 0.3
    })

    const objects: any[] = []
    const geo1 = new THREE.TorusGeometry(3, 0.05, 16, 100)
    const geo2 = new THREE.TorusKnotGeometry(3, 0.7, 40, 8, 3, 4)
    const geo3 = new THREE.TorusGeometry(3.5, 0.4, 12, 48)
    const geo4 = new THREE.TorusGeometry(2, 0.03, 16, 80)
    const geo5 = new THREE.TorusGeometry(1.8, 0.2, 10, 32)

    const geometries = [
      { geo: geo1, mat: matOrchid, pos: [6, 2, 0], rot: [0.002, 0.003] },
      { geo: geo2, mat: matRoseSmoke, pos: [4, -4, -2], rot: [0.002, 0.004] },
      { geo: geo3, mat: matNude, pos: [8, 5, -5], rot: [0.005, 0.002] },
      { geo: geo4, mat: matOrchid, pos: [12, -2, -3], rot: [0.004, 0.006] },
      { geo: geo5, mat: matNude, pos: [10, 0, -8], rot: [0.003, 0.005] }
    ]

    geometries.forEach((g, i) => {
      const mesh = new THREE.Mesh(g.geo, g.mat)
      mesh.position.set(g.pos[0], g.pos[1], g.pos[2])
      scene.add(mesh)
      objects.push({ mesh, rx: g.rot[0], ry: g.rot[1], bx: g.pos[0], by: g.pos[1], offset: i })
    })

    let mouseX = 0
    let mouseY = 0
    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.002
      mouseY = (event.clientY - windowHalfY) * 0.002
    }
    window.addEventListener('mousemove', onMouseMove)

    const clock = new THREE.Clock()
    let animationId: number
    let isActive = false

    const observer = new IntersectionObserver((entries) => {
      isActive = entries[0].isIntersecting
    }, { threshold: 0.1 })
    observer.observe(canvas)

    function animate() {
      animationId = requestAnimationFrame(animate)
      if (!isActive) return

      const elapsedTime = clock.getElapsedTime()
      const targetX = mouseX * 2.5
      const targetY = mouseY * 2.5

      const glow = 0.4 + Math.sin(elapsedTime * 2) * 0.1
      matOrchid.emissiveIntensity = glow
      matRoseSmoke.emissiveIntensity = glow * 0.8

      objects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rx
        obj.mesh.rotation.y += obj.ry
        const floatY = Math.sin(elapsedTime * 0.5 + obj.offset) * 0.6
        const targetPosX = obj.bx + targetX
        const targetPosY = obj.by - targetY + floatY
        obj.mesh.position.x += (targetPosX - obj.mesh.position.x) * 0.08
        obj.mesh.position.y += (targetPosY - obj.mesh.position.y) * 0.08
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
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      observer.disconnect()
      scene.clear()
      renderer.dispose()
      geo1.dispose()
      geo2.dispose()
      geo3.dispose()
      geo4.dispose()
      geo5.dispose()
      matOrchid.dispose()
      matRoseSmoke.dispose()
      matNude.dispose()
    }
  }, [id])

  return <canvas ref={canvasRef} id={id} className="absolute inset-0 w-full h-full pointer-events-none z-[5] will-change-transform" style={{ background: 'transparent' }} />
}
