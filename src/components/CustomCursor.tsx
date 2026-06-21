import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let outlineX = 0
    let outlineY = 0
    let isInitialized = false

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isInitialized) {
        dotX = mouseX
        dotY = mouseY
        outlineX = mouseX
        outlineY = mouseY
        isInitialized = true
        dot.style.opacity = '1'
        outline.style.opacity = '1'
      }

      // Simple event delegation for hover state
      const target = e.target as HTMLElement
      const isInteractable = target.closest('a, button, [data-cursor="hover"], .magnetic')
      
      if (isInteractable) {
        outline.classList.add('cursor-hover')
        dot.classList.add('cursor-dot-hover')
      } else {
        outline.classList.remove('cursor-hover')
        dot.classList.remove('cursor-dot-hover')
      }
    }

    const onMouseLeave = () => {
      dot.style.opacity = '0'
      outline.style.opacity = '0'
    }

    const onMouseEnter = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isInitialized) {
        dotX = mouseX
        dotY = mouseY
        outlineX = mouseX
        outlineY = mouseY
        isInitialized = true
      }
      dot.style.opacity = '1'
      outline.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    let animationId: number

    const animate = () => {
      if (isInitialized) {
        // Snappier tracking factors
        dotX = lerp(dotX, mouseX, 0.75)
        dotY = lerp(dotY, mouseY, 0.75)
        outlineX = lerp(outlineX, mouseX, 0.3)
        outlineY = lerp(outlineY, mouseY, 0.3)

        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`
        outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" style={{ opacity: 0 }} />
      <div ref={outlineRef} className="cursor-outline hidden md:block" style={{ opacity: 0 }} />
    </>
  )
}
